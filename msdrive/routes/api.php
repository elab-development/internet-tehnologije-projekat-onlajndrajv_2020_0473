<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyEmployeeController;
use App\Http\Controllers\CompanyFileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::resource('files', FileController::class)->only([
    'update',
    'destroy',
    'show',
]);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);

    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::get('userdetail', 'userDetails');
    });

    // Route::resource('files', FileController::class)->only([
    //     'show',
    //     'update',
    //     'destroy',
    // ]);
    Route::resource('companies.files', CompanyFileController::class)->only([
        'index',
        'store',
    ]);

    Route::resource('employees', EmployeeController::class)
        ->only(['store', 'destroy'])
        ->middleware('owner');
    Route::resource(
        'companies.employees',
        CompanyEmployeeController::class
    )->only(['index']);
});
