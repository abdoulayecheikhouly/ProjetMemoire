<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_list_users()
    {
        $admin = $this->createTestAdmin();
        $token = $admin->createToken('test-token')->plainTextToken;

        // Créer quelques utilisateurs de test
        $this->createTestUser(['email' => 'user1@example.com']);
        $this->createTestDoctor(['email' => 'doctor1@example.com']);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v1/users');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => [
                        '*' => [
                            'id',
                            'name',
                            'email',
                            'role'
                        ]
                    ],
                    'message'
                ]);
    }

    public function test_admin_can_create_user()
    {
        $admin = $this->createTestAdmin();
        $token = $admin->createToken('test-token')->plainTextToken;

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'role' => 'patient'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->postJson('/api/v1/users', $userData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'data' => [
                        'id',
                        'name',
                        'email',
                        'role'
                    ],
                    'message'
                ]);

        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
            'role' => 'patient'
        ]);
    }

    public function test_admin_can_update_user()
    {
        $admin = $this->createTestAdmin();
        $token = $admin->createToken('test-token')->plainTextToken;

        $user = $this->createTestUser();

        $updateData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->putJson("/api/v1/users/{$user->id}", $updateData);

        $response->assertStatus(200)
                ->assertJson([
                    'data' => [
                        'name' => 'Updated Name',
                        'email' => 'updated@example.com'
                    ],
                    'message' => 'Utilisateur mis à jour avec succès'
                ]);
    }

    public function test_admin_can_delete_user()
    {
        $admin = $this->createTestAdmin();
        $token = $admin->createToken('test-token')->plainTextToken;

        $user = $this->createTestUser();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->deleteJson("/api/v1/users/{$user->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Utilisateur supprimé avec succès'
                ]);

        $this->assertDatabaseMissing('users', [
            'id' => $user->id
        ]);
    }

    public function test_admin_cannot_delete_another_admin()
    {
        $admin = $this->createTestAdmin();
        $token = $admin->createToken('test-token')->plainTextToken;

        $anotherAdmin = $this->createTestAdmin(['email' => 'admin2@example.com']);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->deleteJson("/api/v1/users/{$anotherAdmin->id}");

        $response->assertStatus(403)
                ->assertJson([
                    'message' => 'Impossible de supprimer un administrateur'
                ]);
    }

    public function test_non_admin_cannot_access_user_management()
    {
        $user = $this->createTestUser();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v1/users');

        $response->assertStatus(403);
    }
}





