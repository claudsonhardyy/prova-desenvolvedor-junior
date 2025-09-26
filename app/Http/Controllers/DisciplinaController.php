<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DisciplinaController extends Controller
{
    use AuthorizesRequests; // 🔹 habilita authorize()
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'nome');          // campo de ordenação
        $direction = $request->get('direction', 'asc'); // direção
        $search = $request->get('search');              // termo de pesquisa

        $query = Disciplina::query()
            ->where('user_id', auth()->id()); // 🔹 só disciplinas do usuário

        // 🔹 aplica pesquisa
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nome', 'like', '%' . $search . '%')
                    ->orWhere('codigo', 'like', '%' . $search . '%');
            });
        }

        // 🔹 aplica ordenação
        if (in_array($sort, ['nome', 'codigo', 'carga_horaria', 'ativa'])) {
            $query->orderBy($sort, $direction);
        }

        $disciplinas = $query->paginate(10)->withQueryString();

        return Inertia::render('Disciplinas/Index', [
            'disciplinas' => $disciplinas,
            'sort' => $sort,
            'direction' => $direction,
            'search' => $search,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'codigo' => 'required|string|max:50',
            'carga_horaria' => 'required|integer|min:1',
            'ativa' => 'required|boolean',
        ]);

        // 🔹 sempre vincula ao usuário logado
        $validated['user_id'] = auth()->id();

        Disciplina::create($validated);

        return redirect()->route('disciplinas.index')->with('success', 'Disciplina criada com sucesso!');
    }


    public function update(Request $request, Disciplina $disciplina)
    {
        $this->authorize('update', $disciplina);

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'codigo' => 'required|string|max:50',
            'carga_horaria' => 'required|integer|min:1',
            'ativa' => 'required|boolean',
        ]);

        // 🔹 mantém sempre o user_id correto
        $validated['user_id'] = auth()->id();

        $disciplina->update($validated);

        return redirect()->route('disciplinas.index')->with('success', 'Disciplina atualizada com sucesso!');
    }


    public function destroy(Disciplina $disciplina)
    {
        $this->authorize('delete', $disciplina);

        $disciplina->delete();

        return redirect()->route('disciplinas.index')->with('success', 'Disciplina excluída com sucesso!');
    }
    public function export(Request $request)
    {
        $disciplinas = Disciplina::where('user_id', auth()->id())
            ->orderBy('nome')
            ->get(['nome', 'codigo', 'carga_horaria', 'ativa']);

        $filename = "disciplinas_" . now()->format('Y-m-d_H-i-s') . ".csv";

        $headers = [
            "Content-type" => "text/csv; charset=UTF-8",
            "Content-Disposition" => "attachment; filename={$filename}",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0",
        ];

        $callback = function () use ($disciplinas) {
            $file = fopen('php://output', 'w');

            // 🔹 Cabeçalho CSV
            fputcsv($file, ['Nome', 'Código', 'Carga Horária', 'Status']);

            foreach ($disciplinas as $d) {
                fputcsv($file, [
                    $d->nome,
                    $d->codigo,
                    $d->carga_horaria,
                    $d->ativa ? 'Ativa' : 'Inativa',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

}