<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDisciplinaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:150'],
            'codigo' => [
                'required',
                'string',
                'max:20',
                Rule::unique('disciplinas', 'codigo')->ignore($this->disciplina),
            ],
            'carga_horaria' => ['required', 'integer', 'min:1'],
            'ativa' => ['required', 'boolean'],
        ];
    }
}
