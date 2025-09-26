<?php

namespace Database\Factories;

use App\Models\Disciplina;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DisciplinaFactory extends Factory
{
    protected $model = Disciplina::class;

    public function definition(): array
    {
        $codigos = ['MAT', 'INF', 'ADM', 'POR', 'FIL', 'ENG'];

        return [
            'nome' => ucfirst($this->faker->words(2, true)),
            'codigo' => $this->faker->randomElement($codigos) . $this->faker->numberBetween(100, 999),
            'carga_horaria' => $this->faker->randomElement([30, 45, 60, 80]),
            'ativa' => $this->faker->boolean(70),
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
        ];
    }
}
