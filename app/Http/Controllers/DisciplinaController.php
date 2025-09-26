<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisciplinaController extends Controller
{
    /**
     * Listagem + ordenação + suporte a abrir edição via query (?id=..&action=edit)
     */
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'nome');
        $direction = $request->get('direction', 'asc');

        $validSorts = ['nome', 'codigo', 'carga_horaria', 'ativa', 'created_at'];
        if (!in_array($sort, $validSorts)) {
            $sort = 'nome';
        }

        // Ordenação case-insensitive para campos string
        $query = Disciplina::query();
        if (in_array($sort, ['nome', 'codigo'])) {
            $query->orderByRaw("LOWER($sort) $direction");
        } else {
            $query->orderBy($sort, $direction);
        }

        $disciplinas = $query
            ->paginate(10)
            ->appends(['sort' => $sort, 'direction' => $direction]);

        // Suporte a abrir edição direto (vindo do dashboard)
        $editId = $request->get('id');
        $action = $request->get('action');
        $disciplinaToEdit = null;

        if ($action === 'edit' && $editId) {
            $disciplinaToEdit = Disciplina::find($editId);
        }

        return Inertia::render('Disciplinas/Index', [
            'disciplinas' => $disciplinas,
            'sort' => $sort,
            'direction' => $direction,
            'editId' => $editId,
            'action' => $action,
            'disciplina' => $disciplinaToEdit, // garante edição mesmo fora da página atual
        ]);
    }

    /**
     * Criar disciplina
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nome'          => ['required', 'string', 'max:80'],
            'codigo'        => ['required', 'string', 'min:3', 'max:20', 'unique:disciplinas,codigo'],
            'carga_horaria' => ['required', 'integer', 'min:1'],
            'ativa'         => ['required', 'boolean'],
        ]);

        Disciplina::create($data);

        return redirect()
            ->route('disciplinas.index')
            ->with('success', 'Disciplina criada com sucesso.');
    }

    /**
     * Atualizar disciplina
     */
    public function update(Request $request, Disciplina $disciplina)
    {
        $data = $request->validate([
            'nome'          => ['required', 'string', 'max:80'],
            'codigo'        => ['required', 'string', 'min:3', 'max:20', 'unique:disciplinas,codigo,' . $disciplina->id],
            'carga_horaria' => ['required', 'integer', 'min:1'],
            'ativa'         => ['required', 'boolean'],
        ]);

        $disciplina->update($data);

        return redirect()
            ->route('disciplinas.index', [
                'sort' => $request->get('sort', 'nome'),
                'direction' => $request->get('direction', 'asc'),
            ])
            ->with('success', 'Disciplina atualizada com sucesso.');
    }

    /**
     * Excluir disciplina
     */
    public function destroy(Disciplina $disciplina)
    {
        $disciplina->delete();

        return redirect()
            ->route('disciplinas.index')
            ->with('success', 'Disciplina excluída.');
    }

    // create/show/edit não são usados porque centralizamos tudo na Index.jsx
}
