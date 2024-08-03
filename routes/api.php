<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//API RUTE
// Route::get('/users', [UserController::class, 'index']);
// Route::get('/users/{id}', [UserController::class, 'show']);


// API RESOURCE RUTE
Route::resource('users', UserController::class);

Route::resource('companies', CompanyController::class);

Route::resource('files', FileController::class);

Route::resource('employees', EmployeeController::class);
