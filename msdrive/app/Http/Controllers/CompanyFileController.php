<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Resources\FileCollection;
use App\Http\Resources\FileResource;
use App\Models\File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class CompanyFileController extends Controller
{
    public function index($company_id, Request $request)
    {
        if (is_null($request->path)) {
            $files = File::where('company_id', $company_id)
                ->where('path', "")
                ->get();
        } else {
            $files = File::where('company_id', $company_id)
                ->where('path', $request->path)
                ->get();
        }

        if (is_null($files)) {
            return response()->json('Data not found', 404);
        }

        return new FileCollection($files);
    }

    public function store($company, Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:100'],
                'description' => ['max:255', 'string'],
                'data' => ['required'],
                'extension' => ['required', 'string'],
            ]);

            $name_with_extension = $request->name . "." . $request->extension;
            $full_path = $company . "/" . $request->path;

            $file = new File();

            $file->company_id = $company;
            $file->name = $name_with_extension;
            $file->description = $request->description;
            $file->extension = $request->extension;
            $file->path = Helper::normalizePath($request->path);

            if ($request->type == "" || $request->type == null) {
                $file->mime_type = "unknown";
            } else {
                $file->mime_type = $request->type;
            }

            $file->save();

            Storage::disk('local')->putFileAs(
                $full_path,
                $request->data,
                $file->id . "." . $request->extension
            );

            $file->save();

            return new FileResource($file);
        } catch (ValidationException $e) {
            return new JsonResponse(
                [
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ],
                422
            );
        }
    }
}
