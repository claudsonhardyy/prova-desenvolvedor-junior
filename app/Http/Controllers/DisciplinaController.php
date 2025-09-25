<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use App\Http\Requests\StoreDisciplinaRequest;
use App\Http\Requests\UpdateDisciplinaRequest;
use Inertia\Inertia;

class DisciplinaController extends Controller
{
    // Lista todas as disciplinas
    public function index()
    {
        $disciplinas = Disciplina::orderBy('nome')->get();

        return Inertia::render('Disciplinas/Index', [
            'disciplinas' => $disciplinas,
        ]);
    }

    // Salva nova disciplina
    public function store(StoreDisciplinaRequest $request)
    {
        Disciplina::create($request->validated());

        return redirect()->route('disciplinas.index')->with('success', 'Disciplina criada com sucesso!');
    }

    // Atualiza disciplina existente
    public function update(UpdateDisciplinaRequest $request, Disciplina $disciplina)
    {
        $disciplina->update($request->validated());

        return redirect()->route('disciplinas.index')->with('success', 'Disciplina atualizada com sucesso!');
    }

    // Remove disciplina
    public function destroy(Disciplina $disciplina)
    {
        $disciplina->delete();

        return redirect()->route('disciplinas.index')->with('success', 'Disciplina excluída com sucesso!');
    }
}
