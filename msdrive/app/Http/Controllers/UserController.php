<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        $usersWithoutEmployees = User::doesntHave('employee')->get();
        return  response()->json($usersWithoutEmployees);
    }
}
