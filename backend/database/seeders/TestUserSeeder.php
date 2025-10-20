<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer un administrateur de test
        User::create([
            'name' => 'Admin Test',
            'email' => 'admin@example.com',
            'password' => Hash::make('Password123'),
            'role' => 'admin',
        ]);

        // Créer un médecin de test
        User::create([
            'name' => 'Dr. Smith',
            'email' => 'doctor@example.com',
            'password' => Hash::make('Password123'),
            'role' => 'doctor',
        ]);

        // Créer un patient de test
        User::create([
            'name' => 'John Patient',
            'email' => 'patient@example.com',
            'password' => Hash::make('Password123'),
            'role' => 'patient',
        ]);

        $this->command->info('✅ Utilisateurs de test créés avec succès!');
        $this->command->info('📝 Comptes de test:');
        $this->command->info('   - Admin: admin@example.com / Password123');
        $this->command->info('   - Doctor: doctor@example.com / Password123');
        $this->command->info('   - Patient: patient@example.com / Password123');
    }
}




