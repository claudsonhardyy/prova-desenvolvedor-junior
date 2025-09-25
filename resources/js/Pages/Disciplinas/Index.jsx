import { useState } from "react";
import { useForm, router, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Index({ auth, disciplinas }) {
  const { props } = usePage();
  const flash = props.flash || {};

  const { data, setData, post, put, reset, errors } = useForm({
    id: null,
    nome: "",
    codigo: "",
    carga_horaria: "",
    ativa: true,
  });
  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      put(route("disciplinas.update", data.id), {
        onSuccess: () => { reset(); setEditing(false); },
      });
    } else {
      post(route("disciplinas.store"), {
        onSuccess: () => reset(),
      });
    }
  };

  const handleEdit = (d) => {
    setData({
      id: d.id,
      nome: d.nome,
      codigo: d.codigo,
      carga_horaria: d.carga_horaria,
      ativa: d.ativa,
    });
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja excluir esta disciplina?")) {
      router.delete(route("disciplinas.destroy", id));
    }
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-text-light dark:text-text-dark leading-tight">Disciplinas</h2>}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Feedback */}
        {flash.success && (
          <div className="rounded-md bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-3">
            {flash.success}
          </div>
        )}

        {/* Formulário */}
        <div className="bg-surface-light dark:bg-surface-dark shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">{editing ? "Editar Disciplina" : "Nova Disciplina"}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="nome" value="Nome" />
              <input id="nome" value={data.nome}
                onChange={(e) => setData("nome", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                required />
              <InputError message={errors.nome} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="codigo" value="Código" />
              <input id="codigo" value={data.codigo}
                onChange={(e) => setData("codigo", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                required />
              <InputError message={errors.codigo} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="carga_horaria" value="Carga Horária" />
              <input id="carga_horaria" type="number" value={data.carga_horaria}
                onChange={(e) => setData("carga_horaria", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
                required />
              <InputError message={errors.carga_horaria} className="mt-2" />
            </div>

            <div className="flex items-center">
              <input id="ativa" type="checkbox" checked={data.ativa}
                onChange={(e) => setData("ativa", e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="ativa" className="ml-2 text-sm">Ativa</label>
            </div>

            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition">
                {editing ? "Atualizar" : "Salvar"}
              </button>
              {editing && (
                <button type="button" onClick={() => { reset(); setEditing(false); }}
                  className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista com scrollbar estilizada */}
        <div className="bg-surface-light dark:bg-surface-dark shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Lista de Disciplinas</h3>

          {disciplinas.data.length > 0 ? (
            <>
              <div className="custom-scroll max-h-[420px] overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-white dark:bg-gray-800 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Nome</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Código</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Carga Horária</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Ativa</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {disciplinas.data.map((d) => (
                      <tr key={d.id} className="odd:bg-gray-50 dark:odd:bg-gray-800/50">
                        <td className="px-4 py-2 text-sm">{d.nome}</td>
                        <td className="px-4 py-2 text-sm">{d.codigo}</td>
                        <td className="px-4 py-2 text-sm">{d.carga_horaria}h</td>
                        <td className="px-4 py-2 text-sm">{d.ativa ? "Sim" : "Não"}</td>
                        <td className="px-4 py-2 flex gap-2 justify-end">
                          <button onClick={() => handleEdit(d)} className="text-sm px-3 py-1 rounded bg-primary text-white hover:bg-primary-dark">Editar</button>
                          <button onClick={() => handleDelete(d.id)} className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="mt-4 flex flex-wrap gap-2">
                {disciplinas.links.map((link, i) => (
                  <Link key={i} href={link.url || "#"}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-3 py-1 rounded border ${link.active ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'}`} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">Nenhuma disciplina cadastrada.</p>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
