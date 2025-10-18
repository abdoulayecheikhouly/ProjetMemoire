<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function index()
    {
        $doctors = User::where('role', 'doctor')->get();
        return response()->json([
            'data' => $doctors,
            'message' => 'Médecins récupérés avec succès'
        ], 200);
    }

    public function store(Request $request)
    {
        $doctor = Doctor::create($request->all());
        return response()->json([
            'data' => $doctor,
            'message' => 'Médecin créé avec succès'
        ], 201);
    }

    public function show($id)
    {
        $doctor = Doctor::findOrFail($id);
        return response()->json([
            'data' => $doctor,
            'message' => 'Médecin récupéré avec succès'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->update($request->all());
        return response()->json([
            'data' => $doctor,
            'message' => 'Médecin mis à jour avec succès'
        ], 200);
    }

    public function destroy($id)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->delete();
        return response()->json([
            'message' => 'Médecin supprimé avec succès'
        ], 200);
    }
}
