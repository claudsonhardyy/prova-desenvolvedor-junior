<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Disciplina>
 */
class DisciplinaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => $this->faker->words(2, true), // exemplo: "Cálculo Avançado"
            'codigo' => strtoupper($this->faker->bothify('???###')), // exemplo: "MAT101"
            'carga_horaria' => $this->faker->numberBetween(30, 120),
            'ativa' => $this->faker->boolean(80), // 80% chance de ser ativa
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(), 
        ];
    }
}
