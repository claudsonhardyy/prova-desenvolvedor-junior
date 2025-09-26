<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Disciplina;
use App\Models\User;

class DisciplinaSeeder extends Seeder
{
    public function run(): void
    {
        // 🔹 Garante que exista um usuário para vincular as disciplinas
        $user = User::firstOrCreate(
            ['email' => 'teste@example.com'],
            [
                'name' => 'Usuário Teste',
                'password' => bcrypt('password'), // senha: password
            ]
        );

        $disciplinas = [
            ['nome' => 'Cálculo I', 'codigo' => 'MAT101', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Cálculo II', 'codigo' => 'MAT102', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Álgebra Linear', 'codigo' => 'MAT201', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Geometria Analítica', 'codigo' => 'MAT202', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Português Instrumental', 'codigo' => 'POR101', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Filosofia', 'codigo' => 'FIL101', 'carga_horaria' => 45, 'ativa' => true],
            ['nome' => 'Sociologia', 'codigo' => 'SOC101', 'carga_horaria' => 45, 'ativa' => true],
            ['nome' => 'Física I', 'codigo' => 'FIS101', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Química Geral', 'codigo' => 'QUI101', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Biologia Celular', 'codigo' => 'BIO101', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Introdução à Programação', 'codigo' => 'INF101', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Estruturas de Dados', 'codigo' => 'INF201', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Banco de Dados', 'codigo' => 'INF202', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Engenharia de Software', 'codigo' => 'INF301', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Redes de Computadores', 'codigo' => 'INF302', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Inglês Técnico', 'codigo' => 'ING101', 'carga_horaria' => 45, 'ativa' => true],
            ['nome' => 'Empreendedorismo', 'codigo' => 'ADM101', 'carga_horaria' => 45, 'ativa' => true],
            ['nome' => 'Ética Profissional', 'codigo' => 'ADM102', 'carga_horaria' => 45, 'ativa' => true],
        ];

        foreach ($disciplinas as $disciplina) {
            Disciplina::firstOrCreate(
                ['codigo' => $disciplina['codigo']], // evita duplicação
                array_merge($disciplina, ['user_id' => $user->id]) // vincula ao usuário de teste
            );
        }
    }
}
