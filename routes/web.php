<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DisciplinaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard protegido
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rotas protegidas por autenticação
Route::middleware(['auth', 'verified'])->group(function () {
    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ✅ CRUD Disciplinas
    Route::get('/disciplinas', [DisciplinaController::class, 'index'])->name('disciplinas.index');
    Route::post('/disciplinas', [DisciplinaController::class, 'store'])->name('disciplinas.store');
    Route::put('/disciplinas/{disciplina}', [DisciplinaController::class, 'update'])->name('disciplinas.update');
    Route::delete('/disciplinas/{disciplina}', [DisciplinaController::class, 'destroy'])->name('disciplinas.destroy');
});

require __DIR__.'/auth.php';
