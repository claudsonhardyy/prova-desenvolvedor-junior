<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Disciplina;

class DisciplinaSeeder extends Seeder
{
    public function run(): void
    {
        $disciplinas = [
            [
                'nome' => 'Matemática',
                'codigo' => 'MAT101',
                'carga_horaria' => 60
            ],
            [
                'nome' => 'Português',
                'codigo' => 'POR101',
                'carga_horaria' => 60
            ],
            [
                'nome' => 'História',
                'codigo' => 'HIS101',
                'carga_horaria' => 45
            ],
            [
                'nome' => 'Geografia',
                'codigo' => 'GEO101',
                'carga_horaria' => 45
            ],
            [
                'nome' => 'Inglês',
                'codigo' => 'ING101',
                'carga_horaria' => 30
            ],
        ];

        foreach ($disciplinas as $disciplina) {
            Disciplina::create($disciplina);
        }
    }
}
