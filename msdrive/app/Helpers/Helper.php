<?php

namespace App\Helpers;

class Helper
{
    public static function normalizePath($path)
    {
        $path = str_replace('\\', '/', $path);
        $path = preg_replace('/\/+/', '/', $path);

        $path = trim($path, '/');

        return $path;
    }

    public static function removeContentAfterLastSlash($path)
    {
        $lastSlashPos = strrpos($path, '/');

        if ($lastSlashPos !== false) {
            $path = substr($path, 0, $lastSlashPos);
        }

        return $path;
    }
}
