<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeCollection;
use App\Models\Employee;
use Illuminate\Http\Request;

class CompanyEmployeeController extends Controller
{
    public function index($company_id)
    {
        $employees = Employee::all()->where('company_id', $company_id);
        return new EmployeeCollection($employees);
    }

    public function store(Request $request, $company)
    {
        $request->validate([
            'id' => 'unique',
            'user_id' => 'required',
        ]);

        $employee = new Employee();

        $employee->company_id = $company;
        $employee->user_id = $request->user_id;

        $employee->save();
    }
}
