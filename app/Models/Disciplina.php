<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disciplina extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'codigo',
        'carga_horaria',
        'ativa',
        'user_id', // 🔹 agora pode ser preenchido
    ];

    // 🔹 Relação com usuário (cada disciplina pertence a um usuário)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
