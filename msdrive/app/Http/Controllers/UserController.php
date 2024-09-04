<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->page;
        $pageCount = $request->pageCount;

        $count = User::doesntHave('employee')->count();
        $usersWithoutEmployees = User::doesntHave('employee')
            ->skip(($page - 1) * $pageCount)
            ->take($pageCount)
            ->get();
        return new JsonResponse([
            'users' => $usersWithoutEmployees,
            'count' => $count,
        ]);
    }
}
