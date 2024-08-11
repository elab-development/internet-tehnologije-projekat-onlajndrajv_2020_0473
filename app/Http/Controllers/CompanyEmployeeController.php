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

    public function store(Request $request, $company)
    {
        try {
            $request->validate([
                'user_id' => 'required|unique:employees',
            ]);

            $employee = new Employee();

            $employee->company_id = $company;
            $employee->user_id = $request->user_id;

            $employee->save();

            return new EmployeeResource($employee);
        } catch (ValidationException $e) {
            return new JsonResponse([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }
}
