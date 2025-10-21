<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'notes' => 'nullable|string',
            'prescription' => 'nullable|string',
        ]);

        $record = MedicalRecord::updateOrCreate(
            ['appointment_id' => $request->appointment_id],
            ['notes' => $request->notes, 'prescription' => $request->prescription]
        );

        return response()->json($record);
    }

    public function show($appointmentId)
    {
        return MedicalRecord::where('appointment_id', $appointmentId)->first();
    }
}

