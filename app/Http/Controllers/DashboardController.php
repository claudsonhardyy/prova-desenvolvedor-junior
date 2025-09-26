<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Exibe o dashboard com métricas e últimas disciplinas
     */
    public function index()
    {
        $total = Disciplina::count();
        $ativas = Disciplina::where('ativa', true)->count();
        $inativas = Disciplina::where('ativa', false)->count();

        $ultimas = Disciplina::orderBy('created_at', 'desc')
            ->take(5)
            ->get(['id', 'nome', 'codigo', 'ativa', 'created_at']);

        return Inertia::render('Dashboard', [
            'metrics' => [
                'total' => $total,
                'ativas' => $ativas,
                'inativas' => $inativas,
            ],
            'ultimas' => $ultimas,
        ]);
    }
}
