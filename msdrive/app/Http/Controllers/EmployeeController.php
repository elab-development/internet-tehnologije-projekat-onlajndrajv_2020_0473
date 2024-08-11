<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeCollection;
use App\Http\Resources\EmployeeResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function destroy($id)
    {
        $employee = Employee::find($id);
        $employee->delete();

        return new JsonResponse([
            'message' => 'Employee with id: ' . $id . ' deleted successfully!',
        ], 200);
    }
}
