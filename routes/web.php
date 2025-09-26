<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return redirect()->route('login');
});

// Rotas protegidas por autenticação
Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', function () {
        return inertia('Dashboard');
    })->name('dashboard');
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // 🔹 Rota de exportação CSV (vem antes do resource para evitar conflito)
    Route::get('/disciplinas/export', [DisciplinaController::class, 'export'])
        ->name('disciplinas.export');

    // CRUD de disciplinas
    Route::resource('disciplinas', DisciplinaController::class)->except(['show']);

    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Autenticação (Laravel Breeze/Fortify)
require __DIR__ . '/auth.php';
