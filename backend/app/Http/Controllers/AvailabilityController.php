<?php
namespace App\Http\Controllers;

use App\Models\Availability;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    public function index(Request $request)
    {
        $doctorId = $request->user()->id;
        return Availability::where('doctor_id', $doctorId)->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'jour' => 'required|string',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
        ]);

        $availability = Availability::create([
            'doctor_id' => $request->user()->id,
            'jour' => $request->jour,
            'heure_debut' => $request->heure_debut,
            'heure_fin' => $request->heure_fin,
        ]);

        return response()->json($availability, 201);
    }
}
