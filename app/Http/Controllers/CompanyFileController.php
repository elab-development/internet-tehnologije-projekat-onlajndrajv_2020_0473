<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\FileCollection;
use App\Http\Resources\FileResource;
use App\Models\File;

class CompanyFileController extends Controller
{
    public function index($company_id) {
        $files = File::get()->where('company_id', $company_id);
        if (is_null($files)) {
            return response()->json('Data not found', 404);
        }
        return new FileCollection($files);
    }

    public function show($company_id, $file_id) {
        $file = File::get()->where('company_id', $company_id)->where('id', $file_id)->first();
        if (is_null($file)) {
            return response()->json('Data not found', 404);
        }
        return new FileResource($file);
    }
}

