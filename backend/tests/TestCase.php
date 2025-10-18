<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Configuration pour les tests avec base de données
        $this->setupTestDatabase();
    }

    protected function setupTestDatabase(): void
    {
        // Utiliser SQLite en mémoire pour les tests rapides
        config(['database.default' => 'sqlite_testing']);
        config(['database.connections.sqlite_testing.database' => ':memory:']);
        
        // Ou utiliser PostgreSQL de test si disponible
        // config(['database.default' => 'pgsql_testing']);
    }

    /**
     * Créer une instance de l'application pour les tests
     */
    protected function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * Helper pour créer un utilisateur de test
     */
    protected function createTestUser(array $attributes = []): \App\Models\User
    {
        return \App\Models\User::factory()->create(array_merge([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'patient',
        ], $attributes));
    }

    /**
     * Helper pour créer un médecin de test
     */
    protected function createTestDoctor(array $attributes = []): \App\Models\User
    {
        return \App\Models\User::factory()->create(array_merge([
            'name' => 'Test Doctor',
            'email' => 'doctor@example.com',
            'role' => 'doctor',
        ], $attributes));
    }

    /**
     * Helper pour créer un admin de test
     */
    protected function createTestAdmin(array $attributes = []): \App\Models\User
    {
        return \App\Models\User::factory()->create(array_merge([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ], $attributes));
    }
}