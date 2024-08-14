<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Models\Company;
use App\Models\Employee;
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
            ], 409);
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

        if ($request->add_company) {
            $validator = Validator::make(
                $request->only(['name', 'email', 'password', 'password_confirmation', 'company_name', 'description']),
                [
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'required|string|min:6',
                    'password_confirmation' => 'required|same:password|string',
                    'company_name' => 'required|string|max:255',
                    'description' => 'required|string|max:255',
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

            Company::create([
                'name' => $request->company_name,
                'description' => $request->description,
                'owner_id' => $user->id
            ]);
        } else {
            $validator = Validator::make(
                $request->only(['name', 'email', 'password', 'password_confirmation']),
                [
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'required|string|min:6',
                    'password_confirmation' => 'required|same:password|string',
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
        }

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

    /*Logout API */
    public function logout()
    {
        $user = Auth::user();

        if ($user instanceof \App\Models\User) {
            $user->tokens()->delete();
            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => 'User Logged Out Successfully And Deleted Token',
                'user' => $user,
            ]);
        }

        return response()->json([
            'success' => false,
            'status' => 'error',
            'message' => 'Probably Not Proper Token'
        ], 409);
    }

    /*User Detail API */
    public function userDetails()
    {
        $user = Auth::user();

        $employees = Employee::all()->where('user_id', $user->id);

        if ($employees->first() != null) 
        {
            $company_id = $employees->first()->company_id;
            $company = Company::find($company_id);
            return response()->json(['user'=>Auth::user(), 'employed' => true,'company'=> new CompanyResource($company)]);
        };

        return response()->json(['user'=>Auth::user(), 'employed' => false]);
    }
}
