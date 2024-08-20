<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use function PHPSTORM_META\type;

class FolderController extends Controller
{
    public function index($company, Request $request)
    {
        if (is_null($request->path)) {
            $folders = Folder::where('parent_path', "")
                ->where('company_id', $company)
                ->get();
        } else {
            $folders = Folder::where('parent_path', $request->path)
                ->where('company_id', $company)
                ->get();
        }

        return response()->json($folders);
    }

    public function store($company, Request $request)
    {
        $folder = new Folder();

        $folder->company_id = $company;
        $folder->name = $request->name;
        $folder->path = $folder->name;
        $folder->parent_path = "";

        if (
            !is_null($request->path)
        ) {
            $folder->path =
                $request->path .
                '/' .
                $request->current_folder_name;

            $folder->parent_path = $request->path;
        }

        $folder->save();

        Storage::makeDirectory($company . '/' . $folder->path);

        return $folder;
    }
}
