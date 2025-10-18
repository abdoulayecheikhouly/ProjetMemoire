<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //  Inscription
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            'role' => 'required|in:patient,doctor,admin',
            
        ]);

        // Nettoyage UTF-8 avant insertion
        $user = User::create([
            'name' => utf8_encode($request->name),
            'email' => utf8_encode($request->email),
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Génération d’un seul token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 201, [], JSON_UNESCAPED_UNICODE); //  UTF-8 safe
    }

    // Connexion
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
            'token' => $token,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté avec succès'], 200, [], JSON_UNESCAPED_UNICODE);
    }

    // Profil utilisateur
    public function profile(Request $request)
    {
        return response()->json($request->user(), 200, [], JSON_UNESCAPED_UNICODE);
    }
}
