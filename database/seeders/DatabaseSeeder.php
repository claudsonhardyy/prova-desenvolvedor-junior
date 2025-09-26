<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ⚠️ Desabilitei a factory padrão que criava usuário duplicado
        // \App\Models\User::factory(10)->create();

        // Se quiser, pode criar apenas 1 usuário padrão:
        // \App\Models\User::factory()->create([
        //     'name' => 'Admin',
        //     'email' => 'admin@example.com',
        //     'password' => bcrypt('password'),
        // ]);

        // Nosso seeder de disciplinas
        $this->call(DisciplinaSeeder::class);
    }
}
