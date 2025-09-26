<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Disciplina;
use App\Models\User;

class DisciplinaSeeder extends Seeder
{
    public function run(): void
    {
        // 🔹 Pega ou cria o usuário padrão
        $user = User::first();
        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Usuário Teste',
                'email' => 'teste@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        // 🔹 Disciplinas fixas SEM repetição de códigos
        $disciplinas = [
            ['nome' => 'Cálculo I', 'codigo' => 'MAT101', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Cálculo II', 'codigo' => 'MAT102', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Álgebra Linear', 'codigo' => 'MAT201', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Português Instrumental', 'codigo' => 'POR201', 'carga_horaria' => 45, 'ativa' => true],
            ['nome' => 'Filosofia', 'codigo' => 'FIL101', 'carga_horaria' => 45, 'ativa' => false],
            ['nome' => 'Introdução à Programação', 'codigo' => 'INF101', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Banco de Dados', 'codigo' => 'INF202', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Engenharia de Software', 'codigo' => 'INF301', 'carga_horaria' => 60, 'ativa' => false],
            ['nome' => 'Redes de Computadores', 'codigo' => 'INF302', 'carga_horaria' => 60, 'ativa' => true],
            ['nome' => 'Empreendedorismo', 'codigo' => 'ADM101', 'carga_horaria' => 45, 'ativa' => true],
        ];

        foreach ($disciplinas as $disciplina) {
            Disciplina::updateOrCreate(
                ['codigo' => $disciplina['codigo']], // 🔑 evita duplicar
                array_merge($disciplina, ['user_id' => $user->id])
            );
        }

        // 🔹 Cria mais 30 disciplinas aleatórias
        Disciplina::factory(30)->create(['user_id' => $user->id]);
    }
}
