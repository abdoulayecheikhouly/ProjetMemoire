<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PatientController extends Controller
{
    public function index()
    {
        $patients = User::where('role', 'patient')->get();
        return response()->json([
            'data' => $patients,
            'message' => 'Patients récupérés avec succès'
        ], 200);
    }

    public function show($id)
    {
        $patient = User::where('role', 'patient')->findOrFail($id);
        return response()->json([
            'data' => $patient,
            'message' => 'Patient récupéré avec succès'
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $patient = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'patient',
        ]);

        return response()->json([
            'data' => $patient,
            'message' => 'Patient créé avec succès'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $patient = User::where('role', 'patient')->findOrFail($id);
        
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
        ]);

        $patient->update($request->only(['name', 'email']));

        return response()->json([
            'data' => $patient,
            'message' => 'Patient mis à jour avec succès'
        ], 200);
    }

    public function destroy($id)
    {
        $patient = User::where('role', 'patient')->findOrFail($id);
        $patient->delete();
        
        return response()->json([
            'message' => 'Patient supprimé avec succès'
        ], 200);
    }
}
