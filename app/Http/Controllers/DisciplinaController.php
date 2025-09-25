<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisciplinaController extends Controller
{
    public function index()
    {
        $disciplinas = Disciplina::orderBy('nome')->paginate(10)->withQueryString();

        return Inertia::render('Disciplinas/Index', [
            'disciplinas' => $disciplinas,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome'          => ['required', 'string', 'max:150'],
            'codigo'        => ['required', 'string', 'max:20', 'unique:disciplinas,codigo'],
            'carga_horaria' => ['required', 'integer', 'min:1'],
            'ativa'         => ['required', 'boolean'],
        ]);

        Disciplina::create($data);

        return redirect()->route('disciplinas.index')->with('success', 'Disciplina criada com sucesso!');
    }

    public function update(Request $request, Disciplina $disciplina)
    {
        $data = $request->validate([
            'nome'          => ['required', 'string', 'max:150'],
            'codigo'        => ['required', 'string', 'max:20', 'unique:disciplinas,codigo,' . $disciplina->id],
            'carga_horaria' => ['required', 'integer', 'min:1'],
            'ativa'         => ['required', 'boolean'],
        ]);

        $disciplina->update($data);

        return redirect()->route('disciplinas.index')->with('success', 'Disciplina atualizada com sucesso!');
    }

    public function destroy(Disciplina $disciplina)
    {
        $disciplina->delete();

        return redirect()->route('disciplinas.index')->with('success', 'Disciplina excluída com sucesso!');
    }
}
