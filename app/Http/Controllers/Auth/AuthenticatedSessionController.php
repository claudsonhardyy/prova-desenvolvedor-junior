<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    /**
     * Mostrar formulário de login
     */
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Processar login
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        // Se a caixinha "remember" estiver marcada, persiste o login
        Auth::login($request->user(), $request->boolean('remember'));

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Logout e destruição de sessão
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
