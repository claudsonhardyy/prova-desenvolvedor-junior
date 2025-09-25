<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('disciplinas', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 150);
            $table->string('codigo', 20)->unique();           // ex: IESB-ADS-001
            $table->unsignedSmallInteger('carga_horaria');     // ex: 60, 80, 120
            $table->boolean('ativa')->default(true);           // Ativa/Inativa
            $table->timestamps();

            // Índices úteis (opcional):
            $table->index('nome');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('disciplinas');
    }
};
