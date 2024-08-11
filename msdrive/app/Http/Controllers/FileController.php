<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FileController extends Controller
{

    public function show($id)
    {
        $file = File::get()->where('id', $id)->first();
        if (is_null($file)) {
            return response()->json('Data not found', 404);
        }
        return new FileResource($file);
    }

    public function destroy($id)
    {
        $file = File::find($id);
        $file->delete();

        return new JsonResponse([
            'message' => 'File with id: ' . $id . ' deleted successfully!',
        ], 200);
    }

    public function update($id, Request $request)
    {
        $file = File::find($id);

        if (is_null($file)) {
            return response()->json('Data not found', 404);
        }

        $file->fill($request->all());
        $file->save();

        return $file;
    }
}
