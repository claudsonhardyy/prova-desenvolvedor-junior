<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Disciplina;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Usuário padrão
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('12345678'),
        ]);

        // Chamamos o seeder de disciplinas
        $this->call([
            DisciplinaSeeder::class,
        ]);

        // E também podemos gerar disciplinas fake
        Disciplina::factory(10)->create();
    }
}
