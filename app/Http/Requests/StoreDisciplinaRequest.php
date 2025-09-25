<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDisciplinaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // já protegemos pela rota com auth
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:150'],
            'codigo' => ['required', 'string', 'max:20', 'unique:disciplinas,codigo'],
            'carga_horaria' => ['required', 'integer', 'min:1'],
            'ativa' => ['required', 'boolean'],
        ];
    }
}
