<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Disciplina;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $userId = auth()->id();

        $total = Disciplina::where('user_id', $userId)->count();
        $ativas = Disciplina::where('user_id', $userId)->where('ativa', true)->count();
        $inativas = Disciplina::where('user_id', $userId)->where('ativa', false)->count();

        $ultimas = Disciplina::where('user_id', $userId)
            ->latest()
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
