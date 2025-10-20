<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        Appointment::with(['patient', 'doctor'])->get();

    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'user_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date',
            'motif' => 'required|string',
            'status' => 'required|string'
        ]);

        $appointment = Appointment::create($fields);

        return response()->json($appointment, 201);
    }

    public function show($id)
    {
       return 
           Appointment::with(['patient', 'doctor', 'prescription'])->findOrFail($id);

    }
    public function history(Request $request)
{
    $userId = $request->user()->id;

    return Appointment::with(['doctor'])
        ->where('patient_id', $userId)
        ->orderByDesc('date')
        ->get();
}


    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->update($request->all());
        return response()->json($appointment);
    }

    public function destroy($id)
    {
        Appointment::destroy($id);
        return response()->json(['message' => 'Rendez-vous supprimé']);
    }
}
