<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DisciplinaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => $this->faker->words(3, true),
            'codigo' => strtoupper($this->faker->bothify('ADS###')),
            'carga_horaria' => $this->faker->randomElement([40,60,80,100,120]),
            'ativa' => $this->faker->boolean(80),
        ];
    }
}
