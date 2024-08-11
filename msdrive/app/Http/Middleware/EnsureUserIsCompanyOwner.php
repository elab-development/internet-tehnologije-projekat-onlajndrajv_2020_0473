<?php

namespace App\Http\Middleware;

use App\Models\Company;
use App\Models\Employee;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsCompanyOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();


        //VIDETI DA LI TREBA RETURN ILI NESTO DRUGO
        if (is_null($user)) {
            return response()->json('There is no logged user!');
        }

        if (Company::where('owner_id', $user->id)->exists()) {
            return response()->json(['It is owner!', Company::where('owner_id', $user->id)->first()]);
        }

        if (!Employee::where('user_id', $user->id)->exists()) {
            return response()->json('User does not work in any company!');
        }

        return $next($request);
    }
}
