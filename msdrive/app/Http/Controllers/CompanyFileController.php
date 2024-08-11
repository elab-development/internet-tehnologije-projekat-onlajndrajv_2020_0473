<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\FileCollection;
use App\Http\Resources\FileResource;
use App\Models\File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CompanyFileController extends Controller
{
    public function index($company_id)
    {
        $files = File::get()->where('company_id', $company_id);
        if (is_null($files)) {
            return response()->json('Data not found', 404);
        }
        return new FileCollection($files);
    }

    public function store($company, Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'path' => ['required', 'string', 'max:255'],
            ]);

            $file = new File();

            $file->name  = $request->name;
            $file->path  = $request->path;
            $file->company_id  = $company;

            $file->save();

            return new FileResource($file);
        } catch (ValidationException $e) {
            return new JsonResponse([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }
    
}
