<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        // proveriti ovo obavezno!!!!!!!!!!!
        // $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    /* Login API */
    public function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|string|email',
                'password' => 'required|string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        $succesful_login = Auth::attempt($credentials);

        if (!$succesful_login) {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'unauthorized'
            ], 401);
        }

        $user = Auth::user();

        if ($user instanceof \App\Models\User) {
            $token = $user->createToken('authToken')->plainTextToken;
        } else {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'Returned user is not of type \'User\'. Probably null.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    /* Register API */
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'password_confirmation' => 'required|same:password|string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'User Registered Successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    public function logout()
    {
        $user = Auth::user();
        $token = null;
        if ($user instanceof \App\Models\User) {
            $token = $user->currentAccessToken();
        }
        Auth::logout();
        return [$user, $token];
    }

    /*User Detail API */
    public function userDetails()
    {
        return response()->json(Auth::user());
    }
}
