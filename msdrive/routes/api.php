<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyEmployeeController;
use App\Http\Controllers\CompanyFileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
    Route::get('userdetail', 'userDetails')->middleware('auth:sanctum');
});

Route::resource('files', FileController::class)->only(['show', 'update', 'destroy']);
Route::resource('employees', EmployeeController::class)->only(['destroy'])->middleware('owner');

Route::resource('companies.files', CompanyFileController::class)->only(['index', 'store']);
Route::resource('companies.employees', CompanyEmployeeController::class)->only(['index', 'store']);
