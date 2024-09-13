<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'path', 'parent_path'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
