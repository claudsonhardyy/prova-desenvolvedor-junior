<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Disciplina;

class DisciplinaPolicy
{
    /**
     * Determina se o usuário pode visualizar a disciplina.
     */
    public function view(User $user, Disciplina $disciplina): bool
    {
        return $user->id === $disciplina->user_id;
    }

    /**
     * Determina se o usuário pode criar disciplinas.
     */
    public function create(User $user): bool
    {
        return true; // qualquer usuário autenticado pode criar
    }

    /**
     * Determina se o usuário pode atualizar a disciplina.
     */
    public function update(User $user, Disciplina $disciplina): bool
    {
        return $user->id === $disciplina->user_id;
    }

    /**
     * Determina se o usuário pode excluir a disciplina.
     */
    public function delete(User $user, Disciplina $disciplina): bool
    {
        return $user->id === $disciplina->user_id;
    }
}
