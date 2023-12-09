<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Main Page</title>
</head>
<body>
    <h1>Main Page!</h1>

    {{-- blendovanje svih usera na glavnoj stranici --}}
    @foreach ($users as $user)
        {{-- putanja do konkretnog usera --}}
        <a href="/users/{{$user->id}}">
            <div>
                <p>{{$user->id}} {{$user->username}}</p>
            </div>
        </a>
    @endforeach

</body>
</html>