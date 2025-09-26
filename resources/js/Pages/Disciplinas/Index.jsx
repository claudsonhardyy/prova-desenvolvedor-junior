import { useEffect, useMemo, useState } from "react";
import { useForm, router, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Button from "@/Components/ui/Button";
import Toggle from "@/Components/ui/Toggle";
import { useToast } from "@/Components/ui/useToast.jsx";
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
} from "@heroicons/react/24/outline";
import ConfirmModal from "@/Components/ui/ConfirmModal";

const NOME_MAX = 80;
const CODIGO_MIN = 3;

export default function Index({ auth, disciplinas, sort, direction, search: initialSearch, editId, action, disciplina }) {
  const { props } = usePage();
  const flash = props.flash || {};
  const toast = useToast();

  const { data, setData, post, put, reset, errors, processing, setError, clearErrors } = useForm({
    id: null,
    nome: "",
    codigo: "",
    carga_horaria: "",
    ativa: true,
  });

  const [editing, setEditing] = useState(false);

  // 🔹 pesquisa
  const [search, setSearch] = useState(initialSearch || "");

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(
      route("disciplinas.index"),
      { search, sort, direction },
      { preserveState: true, replace: true }
    );
  };

  // 🔹 modal de exclusão
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [disciplinaToDelete, setDisciplinaToDelete] = useState(null);

  // flash messages
  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
  }, [flash.success, flash.error, toast]);

  // validação simples no front
  const isValidFront = useMemo(() => {
    if (!data.nome?.trim()) return false;
    if (data.nome.length > NOME_MAX) return false;
    if (!data.codigo?.trim() || data.codigo.length < CODIGO_MIN) return false;
    if (!String(data.carga_horaria).trim()) return false;
    if (Number(data.carga_horaria) <= 0) return false;
    return true;
  }, [data]);

  // abrir edição automática
  useEffect(() => {
    if (action === "edit" && disciplina) {
      setData({
        id: disciplina.id,
        nome: disciplina.nome,
        codigo: disciplina.codigo,
        carga_horaria: disciplina.carga_horaria,
        ativa: !!disciplina.ativa,
      });
      setEditing(true);
      toast.info(`Editando disciplina: ${disciplina.nome}`);
      return;
    }

    if (action === "edit" && editId) {
      const found = disciplinas?.data?.find((d) => String(d.id) === String(editId));
      if (found) {
        setData({
          id: found.id,
          nome: found.nome,
          codigo: found.codigo,
          carga_horaria: found.carga_horaria,
          ativa: !!found.ativa,
        });
        setEditing(true);
        toast.info(`Editando disciplina: ${found.nome}`);
      }
    }
  }, [action, editId, disciplina, disciplinas?.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    if (data.nome.length > NOME_MAX) {
      setError("nome", `Máximo de ${NOME_MAX} caracteres`);
      return;
    }
    if (data.codigo.length < CODIGO_MIN) {
      setError("codigo", `Mínimo de ${CODIGO_MIN} caracteres`);
      return;
    }
    if (Number(data.carga_horaria) <= 0) {
      setError("carga_horaria", "Informe um valor maior que zero");
      return;
    }

    if (editing) {
      put(route("disciplinas.update", data.id), {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          setEditing(false);
          toast.success("Disciplina atualizada!");
        },
        onError: () => toast.error("Não foi possível atualizar."),
      });
    } else {
      post(route("disciplinas.store"), {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          toast.success("Disciplina criada!");
        },
        onError: () => toast.error("Não foi possível criar."),
      });
    }
  };

  const handleEdit = (d) => {
    setData({
      id: d.id,
      nome: d.nome,
      codigo: d.codigo,
      carga_horaria: d.carga_horaria,
      ativa: !!d.ativa,
    });
    setEditing(true);
  };

  const toggleSort = (field) => {
    const isSame = sort === field;
    const newDirection = isSame && direction === "asc" ? "desc" : "asc";
    router.get(
      route("disciplinas.index"),
      { sort: field, direction: newDirection, search },
      { preserveState: true, preserveScroll: true }
    );
  };

  const renderSortIcon = (field) => {
    if (sort !== field) return <ArrowSmallUpIcon className="w-4 h-4 opacity-30" />;
    return direction === "asc" ? (
      <ArrowSmallUpIcon className="w-4 h-4 text-primary" />
    ) : (
      <ArrowSmallDownIcon className="w-4 h-4 text-primary" />
    );
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-text-light dark:text-text-dark leading-tight">Disciplinas</h2>}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* 🔹 Barra de pesquisa */}
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome ou código..."
            className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
          />
          <Button type="submit">Pesquisar</Button>

          {search && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setSearch("");
                router.get(
                  route("disciplinas.index"),
                  { sort, direction },
                  { preserveState: true, replace: true }
                );
              }}
            >
              Limpar
            </Button>
          )}
        </form>

        {/* 🔹 Botão de exportação */}
        <div className="mt-4">
          <a
            href={route("disciplinas.export")}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
          >
            Exportar CSV
          </a>
        </div>



        {/* Formulário de disciplina */}
        <div className="bg-surface-light dark:bg-surface-dark shadow rounded-lg p-6 transition-colors duration-300">
          <h3 className="text-lg font-medium mb-4">{editing ? "Editar Disciplina" : "Nova Disciplina"}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="nome" value="Nome" />
              <input
                id="nome"
                value={data.nome}
                onChange={(e) => setData("nome", e.target.value)}
                maxLength={NOME_MAX}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {data.nome.length}/{NOME_MAX}
              </div>
              <InputError message={errors.nome} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="codigo" value="Código" />
              <input
                id="codigo"
                value={data.codigo}
                onChange={(e) => setData("codigo", e.target.value.toUpperCase())}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Ex.: MAT101"
                required
              />
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                mínimo {CODIGO_MIN} caracteres
              </div>
              <InputError message={errors.codigo} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="carga_horaria" value="Carga Horária (h)" />
              <input
                id="carga_horaria"
                type="number"
                min={1}
                value={data.carga_horaria}
                onChange={(e) => setData("carga_horaria", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
              <InputError message={errors.carga_horaria} className="mt-2" />
            </div>

            <div className="flex items-end">
              <Toggle
                id="ativa"
                checked={!!data.ativa}
                onChange={(val) => setData("ativa", val)}
                label="Ativa"
              />
            </div>

            <div className="sm:col-span-2 flex gap-3">
              <Button type="submit" disabled={!isValidFront || processing}>
                {editing ? "Atualizar" : "Salvar"}
              </Button>
              {editing && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    reset();
                    setEditing(false);
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Lista */}
        <div className="bg-surface-light dark:bg-surface-dark shadow rounded-lg p-6 transition-colors duration-300">
          <h3 className="text-lg font-medium mb-4">Lista de Disciplinas</h3>

          {disciplinas.data.length > 0 ? (
            <>
              <div className="custom-scroll max-h-[420px] overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-white dark:bg-gray-800 sticky top-0 z-10">
                    <tr>
                      <th
                        className="px-4 py-2 text-left text-sm font-semibold cursor-pointer select-none"
                        onClick={() => toggleSort("nome")}
                      >
                        <div className="flex items-center gap-1">
                          Nome {renderSortIcon("nome")}
                        </div>
                      </th>
                      <th
                        className="px-4 py-2 text-left text-sm font-semibold cursor-pointer select-none"
                        onClick={() => toggleSort("codigo")}
                      >
                        <div className="flex items-center gap-1">
                          Código {renderSortIcon("codigo")}
                        </div>
                      </th>
                      <th
                        className="px-4 py-2 text-left text-sm font-semibold cursor-pointer select-none"
                        onClick={() => toggleSort("carga_horaria")}
                      >
                        <div className="flex items-center gap-1">
                          Carga Horária {renderSortIcon("carga_horaria")}
                        </div>
                      </th>
                      <th
                        className="px-4 py-2 text-left text-sm font-semibold cursor-pointer select-none"
                        onClick={() => toggleSort("ativa")}
                      >
                        <div className="flex items-center gap-1">
                          Status {renderSortIcon("ativa")}
                        </div>
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {disciplinas.data.map((d) => (
                      <tr
                        key={d.id}
                        className="odd:bg-gray-50 dark:odd:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-4 py-2 text-sm">{d.nome}</td>
                        <td className="px-4 py-2 text-sm">{d.codigo}</td>
                        <td className="px-4 py-2 text-sm">{d.carga_horaria}h</td>
                        <td className="px-4 py-2 text-sm">
                          {d.ativa ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                              Ativa
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              Inativa
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            className="!px-2"
                            onClick={() => handleEdit(d)}
                            title="Editar"
                          >
                            <PencilSquareIcon className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="danger"
                            className="!px-2"
                            onClick={() => {
                              setDisciplinaToDelete(d.id);
                              setConfirmOpen(true);
                            }}
                            title="Excluir"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="mt-4 flex flex-wrap gap-2">
                {disciplinas.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url || "#"}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-3 py-1 rounded border ${link.active
                      ? "bg-primary text-white border-primary"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                      } ${!link.url ? "opacity-50 pointer-events-none" : ""}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">Nenhuma disciplina encontrada.</p>
          )}
        </div>
      </div>

      {/* 🔹 Modal de confirmação de exclusão */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          router.delete(route("disciplinas.destroy", disciplinaToDelete), {
            preserveScroll: true,
            onSuccess: () => toast.success("Disciplina excluída."),
            onError: () => toast.error("Falha ao excluir."),
          });
          setConfirmOpen(false);
        }}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta disciplina? Essa ação não pode ser desfeita."
      />
    </AuthenticatedLayout>
  );
}
