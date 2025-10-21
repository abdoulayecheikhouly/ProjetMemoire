<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'patient'
        ];

        $response = $this->postJson('/api/v1/register', $userData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'message',
                    'token',
                    'user' => [
                        'id',
                        'name',
                        'email',
                        'role'
                    ]
                ]);

        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com',
            'role' => 'patient'
        ]);
    }

    public function test_user_can_login()
    {
        $user = $this->createTestUser([
            'email' => 'test@example.com',
            'password' => bcrypt('password123')
        ]);

        $loginData = [
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        $response = $this->postJson('/api/v1/login', $loginData);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'message',
                    'user',
                    'token'
                ]);
    }

    public function test_user_can_logout()
    {
        $user = $this->createTestUser();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->postJson('/api/v1/logout');

        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Déconnecté avec succès'
                ]);
    }

    public function test_authenticated_user_can_get_profile()
    {
        $user = $this->createTestUser();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v1/user');

        $response->assertStatus(200)
                ->assertJson([
                    'id' => $user->id,
                    'email' => $user->email
                ]);
    }
}





