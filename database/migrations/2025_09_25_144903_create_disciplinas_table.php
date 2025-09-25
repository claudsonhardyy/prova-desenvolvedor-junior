<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('disciplinas', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 150);
            $table->string('codigo', 20)->unique();
            $table->unsignedSmallInteger('carga_horaria');
            $table->boolean('ativa')->default(true);
            $table->timestamps();
            $table->index('nome');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('disciplinas');
    }
};
