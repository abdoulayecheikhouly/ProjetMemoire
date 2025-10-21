<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Vérifie si l'utilisateur a le rôle requis.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role = null)
    {
        $user = $request->user(); // plus fiable que Auth::user() avec Sanctum

        if (!$user) {
            return response()->json(['message' => 'Veuillez vous connecter.'], 401);
        }

        if ($role && $user->role !== $role) {
            return response()->json(['message' => 'Accès refusé : rôle requis = ' . $role], 403);
        }

        return $next($request);
    }
}
