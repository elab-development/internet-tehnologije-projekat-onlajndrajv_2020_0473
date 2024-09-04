<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\File;
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

        if (!is_null($request->path)) {
            $folder->path = $request->path . '/' . $request->name;

            $folder->parent_path = $request->path;
        }

        if (Folder::where('path', $folder->path)->exists()) {
            return response()->json(
                "This folder name already exists in this directory",
                400
            );
        }

        $folder->save();

        Storage::makeDirectory($company . '/' . $folder->path);

        return $folder;
    }

    public function destroy($company, Request $request)
    {
        $folder = Folder::find($request->id);

        $this->deleteChildFolders($company, $folder->path);

        Storage::deleteDirectory($company . '/' . $folder->path);

        $folder->delete();

        return response()->json('Success deleting folder and all its files');
    }

    private function deleteChildFolders($company, $parentPath)
    {
        $childFolders = Folder::where('parent_path', $parentPath)->get();
        $childFiles = File::where('path', $parentPath)->get();

        foreach ($childFolders as $childFolder) {
            $this->deleteChildFolders($company, $childFolder->path);

            Storage::deleteDirectory($company . '/' . $childFolder->path);

            $childFolder->delete();
        }

        foreach ($childFiles as $childFile) {
            $childFile->delete();
        }
    }
}
