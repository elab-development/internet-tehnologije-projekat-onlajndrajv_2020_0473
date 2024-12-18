<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeCollection;
use App\Http\Resources\EmployeeResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EmployeeController extends Controller
{
    public function destroy($id)
    {
        $employee = Employee::find($id);
        $employee->delete();

        return new JsonResponse(
            [
                'message' =>
                    'Employee with id: ' . $id . ' deleted successfully!',
            ],
            200
        );
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|unique:employees',
            ]);

            $employee = new Employee();

            $employee->company_id = $request->company_id;
            $employee->user_id = $request->user_id;

            $employee->save();

            return new EmployeeResource($employee);
        } catch (ValidationException $e) {
            return new JsonResponse(
                [
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ],
                422
            );
        }
    }
}
