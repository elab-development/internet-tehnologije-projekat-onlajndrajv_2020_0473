<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h3>{{$user->id}} Username: {{$user->username}}</h3>

    @foreach ($folders as $folder)
        <h4>{{$folder->id}} Folder: {{$folder->name}}</h4>        
    @endforeach
    
    @foreach ($files as $file)
        <h4>{{$file->id}} File: {{$file->name}}</h4>        
    @endforeach
    
</body>
</html>