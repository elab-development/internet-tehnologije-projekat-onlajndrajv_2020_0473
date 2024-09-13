<?php

namespace App\Http\Middleware;

use App\Http\Resources\CompanyResource;
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
        $user = $request->user();

        $company = Company::find($request->company_id);

        if ($user->id != $company->owner_id) {
            return response()->json('Not an owner!');
        }

        return $next($request);
    }
}
