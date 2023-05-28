<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Tender Management System</title>

        <link href="https://fonts.gstatic.com" rel="preconnect">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">


        <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">

        <link href="assets/css/style.css" rel="stylesheet">

    </head>
    <body>
        <div id="app"></div>

        @viteReactRefresh
        @vite(['resources/css/app.css','resources/js/app.jsx'])


        <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>


        <!-- Template Main JS File -->
        {{-- <script src="assets/js/main.js"></script> --}}

    </body>
</html>
