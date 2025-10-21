<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json([
            'data' => $users,
            'message' => 'Utilisateurs récupérés avec succès'
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:patient,doctor,admin',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json([
            'data' => $user,
            'message' => 'Utilisateur créé avec succès'
        ], 201);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'data' => $user,
            'message' => 'Utilisateur récupéré avec succès'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
            'role' => 'sometimes|in:patient,doctor,admin',
        ]);

        $user->update($request->only(['name', 'email', 'role']));

        return response()->json([
            'data' => $user,
            'message' => 'Utilisateur mis à jour avec succès'
        ], 200);
    }

    public function appointments()
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        return response()->json(Appointment::with(['patient', 'doctor'])->get());
    }

     if ($user->role === 'admin') {
           return response()->json(['message' => 'Impossible de supprimer un administrateur'], 403);
     }

       $user->delete();
       
         return response()->json([
             'message' => 'Utilisateur supprimé avec succès'
         ], 200);
}

        if ($user->role === 'admin') {
            return response()->json(['message' => 'Impossible de supprimer un administrateur'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
