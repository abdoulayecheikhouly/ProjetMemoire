<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Appointment;

class AdminController extends Controller
{
    public function index()
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        return response()->json(['users' => User::select('id', 'name', 'email', 'role')->get()]);
    }

    public function appointments()
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        return response()->json(Appointment::with(['patient', 'doctor'])->get());
    }

    public function stats()
{
      return response()->json([
        'total_users' => User::count(),
        'total_patients' => User::where('role', 'patient')->count(),
        'total_doctors' => User::where('role', 'doctor')->count(),
        'total_appointments' => Appointment::count(),
        'appointments_today' => Appointment::whereDate('date', today())->count(),
    ]);
}

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }

        if ($user->role === 'admin') {
            return response()->json(['message' => 'Impossible de supprimer un administrateur'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
