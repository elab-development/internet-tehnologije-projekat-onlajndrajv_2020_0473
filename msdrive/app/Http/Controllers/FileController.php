<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\File;
use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function show($id)
    {
        $file = File::find($id);
        return Storage::download(
            $file->company_id .
                "/" .
                $file->path .
                "/" .
                $id .
                "." .
                $file->extension
        );
    }

    public function destroy($id)
    {
        $file = File::find($id);
        Storage::delete(
            $file->company_id .
                "/" .
                $file->path .
                "/" .
                $id .
                "." .
                $file->extension
        );
        $file->delete();

        return new JsonResponse(
            [
                'message' =>
                    'File with id: ' .
                    $id .
                    ' deleted successfully from database and storage!',
            ],
            200
        );
    }

    public function update($id, Request $request)
    {
        $file = File::find($id);

        if (is_null($file)) {
            return response()->json('Data not found', 404);
        }

        if ($file->path != $request->path) {
            $name_in_db = $file->id . '.' . $file->extension;
            $old_path =
                $file->company_id . '/' . $file->path . '/' . $name_in_db;
            $new_path =
                $file->company_id . '/' . $request->path . '/' . $name_in_db;

            Storage::move($old_path, $new_path);
        }

        $file->fill($request->all());
        $file->path = Helper::normalizePath($request->path);

        $file->save();

        return $file;
    }
}
