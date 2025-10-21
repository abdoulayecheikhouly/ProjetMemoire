<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return response()->json(
            User::where('role', 'patient')->get()
        );
    }

    public function show($id)
    {
        return response()->json(
            User::where('role', 'patient')->findOrFail($id)
        );
    }
}
