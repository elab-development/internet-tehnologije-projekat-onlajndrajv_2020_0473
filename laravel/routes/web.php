<?php

use App\Models\File;
use App\Models\User;
use App\Models\Folder;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('main', [
        'users' => User::all(),
    ]);
});

Route::get('/users/{id}', function ($id) {
    return view('user_data', [
        'user' => User::find($id),
        'folders' => Folder::all()->where('user_id', $id),
        'files' => File::all()->where('user_id', $id),
    ]);
});
