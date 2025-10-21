<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApiLogging
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $startTime = microtime(true);
        
        $response = $next($request);
        
        $endTime = microtime(true);
        $duration = round(($endTime - $startTime) * 1000, 2);
        
        // Log des accès API
        Log::channel('api')->info('API Access', [
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'user_id' => auth()->id(),
            'status_code' => $response->getStatusCode(),
            'duration_ms' => $duration,
            'timestamp' => now()->toISOString(),
        ]);
        
        return $response;
    }
}





