<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeCollection;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class CompanyEmployeeController extends Controller
{
    public function index($company_id)
    {
        $employees = Employee::all()->where('company_id', $company_id);
        return new EmployeeCollection($employees);
    }


}
