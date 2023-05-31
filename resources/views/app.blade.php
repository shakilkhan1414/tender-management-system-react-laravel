<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Tender Management System</title>
        <link rel="shortcut icon" href="{{asset('assets/img/logo.png')}}" type="image/x-icon">

        <link href="https://fonts.gstatic.com" rel="preconnect">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">


        <link href="{{asset('assets/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
        <link href="{{asset('assets/vendor/bootstrap-icons/bootstrap-icons.css')}}" rel="stylesheet">

        <link href="{{asset('assets/css/style.css')}}" rel="stylesheet">

        <link href="{{asset('assets/noty/noty.css')}}" rel="stylesheet" type="text/css">
        <link href="{{asset('assets/noty/sunset.css')}}" rel="stylesheet" type="text/css">

    </head>
    <body>
        <div id="app"></div>

        @viteReactRefresh
        @vite(['resources/css/app.css','resources/js/app.jsx'])


        <script src="{{asset('assets/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>


    </body>
</html>
