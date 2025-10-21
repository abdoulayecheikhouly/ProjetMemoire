<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with(['patient', 'doctor'])->get();
        return response()->json([
            'data' => $appointments,
            'message' => 'Rendez-vous récupérés avec succès'
        ], 200);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'user_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'motif' => 'required|string',
            'status' => 'required|string'
        ]);

        $appointment = Appointment::create($fields);

        return response()->json([
            'data' => $appointment,
            'message' => 'Rendez-vous créé avec succès'
        ], 201);
    }

    public function show($id)
    {
        $appointment = Appointment::with(['patient', 'doctor', 'prescription'])->findOrFail($id);
        return response()->json([
            'data' => $appointment,
            'message' => 'Rendez-vous récupéré avec succès'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->update($request->all());
        return response()->json([
            'data' => $appointment,
            'message' => 'Rendez-vous mis à jour avec succès'
        ], 200);
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();
        return response()->json([
            'message' => 'Rendez-vous supprimé avec succès'
        ], 200);
    }
}
