<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\PatientController;

// API Version 1 - RESTful routes
Route::prefix('v1')->group(function () {
    
    // Authentication routes (public) - avec rate limiting
    Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:5,1');
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        
        // User profile
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', fn(Request $request) => $request->user());

        // Admin routes - Full CRUD access
        Route::middleware('role:admin')->group(function () {
            Route::apiResource('users', AdminController::class);
            Route::apiResource('doctors', DoctorController::class);
            Route::apiResource('patients', PatientController::class);
            Route::apiResource('appointments', AppointmentController::class);
            Route::apiResource('prescriptions', PrescriptionController::class);
        });

        // Doctor routes - Limited access
        Route::middleware('role:doctor')->group(function () {
            Route::apiResource('appointments', AppointmentController::class)
                ->only(['index', 'show', 'update']);
            Route::apiResource('prescriptions', PrescriptionController::class);
        });

        // Patient routes - Limited access
        Route::middleware('role:patient')->group(function () {
            Route::apiResource('appointments', AppointmentController::class)
                ->only(['index', 'show', 'store']);
        });
    });
});
