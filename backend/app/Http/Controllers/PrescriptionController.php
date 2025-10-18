<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    public function index()
    {
        $prescriptions = Prescription::with(['user', 'doctor', 'appointment'])->get();
        return response()->json([
            'data' => $prescriptions,
            'message' => 'Prescriptions récupérées avec succès'
        ], 200);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'user_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_id' => 'required|exists:appointments,id',
            'medication' => 'required|string',
            'instructions' => 'required|string',
        ]);

        $prescription = Prescription::create($fields);

        return response()->json([
            'data' => $prescription,
            'message' => 'Prescription créée avec succès'
        ], 201);
    }

    public function show($id)
    {
        $prescription = Prescription::with(['user', 'doctor', 'appointment'])->findOrFail($id);
        return response()->json([
            'data' => $prescription,
            'message' => 'Prescription récupérée avec succès'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $prescription = Prescription::findOrFail($id);
        $prescription->update($request->all());
        return response()->json([
            'data' => $prescription,
            'message' => 'Prescription mise à jour avec succès'
        ], 200);
    }

    public function destroy($id)
    {
        $prescription = Prescription::findOrFail($id);
        $prescription->delete();
        return response()->json([
            'message' => 'Prescription supprimée avec succès'
        ], 200);
    }
}
