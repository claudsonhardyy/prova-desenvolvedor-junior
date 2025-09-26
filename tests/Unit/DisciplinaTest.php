<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Disciplina;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DisciplinaTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function usuario_cria_disciplina_com_user_id()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $disciplina = Disciplina::factory()->create([
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('disciplinas', [
            'id' => $disciplina->id,
            'user_id' => $user->id,
        ]);
    }

    /** @test */
    public function usuario_pode_atualizar_sua_propria_disciplina()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $disciplina = Disciplina::factory()->create([
            'user_id' => $user->id,
            'nome' => 'Disciplina Antiga',
        ]);

        $disciplina->update(['nome' => 'Disciplina Nova']);

        $this->assertEquals('Disciplina Nova', $disciplina->fresh()->nome);
    }

    /** @test */
    public function usuario_nao_pode_atualizar_disciplina_de_outro_usuario()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $disciplina = Disciplina::factory()->create([
            'user_id' => $user1->id,
            'nome' => 'Disciplina Original',
        ]);

        $this->actingAs($user2);

        $this->expectException(\Illuminate\Auth\Access\AuthorizationException::class);

        $this->authorize('update', $disciplina);
    }

    /** @test */
    public function usuario_pode_excluir_sua_propria_disciplina()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $disciplina = Disciplina::factory()->create([
            'user_id' => $user->id,
        ]);

        $disciplina->delete();

        $this->assertDatabaseMissing('disciplinas', ['id' => $disciplina->id]);
    }

    /** @test */
    public function usuario_nao_pode_excluir_disciplina_de_outro_usuario()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $disciplina = Disciplina::factory()->create([
            'user_id' => $user1->id,
        ]);

        $this->actingAs($user2);

        $this->expectException(\Illuminate\Auth\Access\AuthorizationException::class);

        $this->authorize('delete', $disciplina);
    }
}
