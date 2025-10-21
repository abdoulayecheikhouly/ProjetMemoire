<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Doctor;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AppointmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_patient_can_create_appointment()
    {
        $patient = $this->createTestUser(['role' => 'patient']);
        $doctor = $this->createTestDoctor();
        
        // Créer un enregistrement Doctor associé
        Doctor::create([
            'user_id' => $doctor->id,
            'specialite_id' => 1,
            'numero_ordre' => '12345'
        ]);

        $token = $patient->createToken('test-token')->plainTextToken;

        $appointmentData = [
            'user_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'date' => '2024-12-25 10:00:00',
            'motif' => 'Consultation générale',
            'status' => 'pending'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->postJson('/api/v1/appointments', $appointmentData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'data' => [
                        'id',
                        'user_id',
                        'doctor_id',
                        'date',
                        'motif',
                        'status'
                    ],
                    'message'
                ]);

        $this->assertDatabaseHas('appointments', [
            'user_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'motif' => 'Consultation générale'
        ]);
    }

    public function test_patient_can_view_their_appointments()
    {
        $patient = $this->createTestUser(['role' => 'patient']);
        $token = $patient->createToken('test-token')->plainTextToken;

        // Créer quelques rendez-vous
        Appointment::create([
            'user_id' => $patient->id,
            'doctor_id' => 1,
            'date' => '2024-12-25 10:00:00',
            'motif' => 'Consultation 1',
            'status' => 'pending'
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v1/appointments');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => [
                        '*' => [
                            'id',
                            'user_id',
                            'doctor_id',
                            'date',
                            'motif',
                            'status'
                        ]
                    ],
                    'message'
                ]);
    }

    public function test_doctor_can_update_appointment()
    {
        $doctor = $this->createTestDoctor();
        $patient = $this->createTestUser(['role' => 'patient']);
        
        $token = $doctor->createToken('test-token')->plainTextToken;

        $appointment = Appointment::create([
            'user_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'date' => '2024-12-25 10:00:00',
            'motif' => 'Consultation',
            'status' => 'pending'
        ]);

        $updateData = [
            'status' => 'completed',
            'motif' => 'Consultation terminée'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->putJson("/api/v1/appointments/{$appointment->id}", $updateData);

        $response->assertStatus(200)
                ->assertJson([
                    'data' => [
                        'status' => 'completed',
                        'motif' => 'Consultation terminée'
                    ],
                    'message' => 'Rendez-vous mis à jour avec succès'
                ]);
    }

    public function test_doctor_can_view_appointments()
    {
        $doctor = $this->createTestDoctor();
        $token = $doctor->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v1/appointments');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data',
                    'message'
                ]);
    }

    public function test_patient_cannot_update_appointment()
    {
        $patient = $this->createTestUser(['role' => 'patient']);
        $token = $patient->createToken('test-token')->plainTextToken;

        $appointment = Appointment::create([
            'user_id' => $patient->id,
            'doctor_id' => 1,
            'date' => '2024-12-25 10:00:00',
            'motif' => 'Consultation',
            'status' => 'pending'
        ]);

        $updateData = ['status' => 'completed'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->putJson("/api/v1/appointments/{$appointment->id}", $updateData);

        $response->assertStatus(403);
    }
}





