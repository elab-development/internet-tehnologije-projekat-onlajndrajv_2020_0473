<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $table = 'folders';

    protected $fillable = [
        'id',
        'user_id',
        'name',
        'parent_folder_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function parentFolder()
    {
        return $this->belongsTo(Folder::class);
    }

    public function childFolders()
    {
        return $this->hasMany(Folder::class);
    }

}
