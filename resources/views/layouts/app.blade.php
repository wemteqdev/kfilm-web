<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="passport-token" content="{{ session('user_access_token') }}">

    <title>KORFILM</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <link rel="stylesheet" href="/admin/css/vendor.css">
    <link rel="stylesheet" href="/admin/css/app.css">
    @yield('css')
</head>

<body>
<div class="site-color-ribbon"></div>
<div id="wrapper" class="toggled">

    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        @include('layouts.sidebar')
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">
         <header class="main-header">
            <!-- Header Navbar -->
            <nav class="navbar" role="navigation">
                <!-- Sidebar toggle button-->
                <a href="#" class="sidebar-toggle" id="sidebar-toggle" data-toggle="push-menu" role="button">
                    <i class="fa fa-bars"></i>
                </a>

                <div>
                    
                    {!! Form::open(['method' => 'POST', 'route' => 'logout']) !!}
                        @if (Auth::user())
                            <button type="submit" class="btn btn-warning">Logout</button>
                        @endif
                    {!! Form::close() !!}
                    
                    
                </div>
            </nav>
        </header>

        <div class="content-wrapper">
            @yield('content')
        </div>

    </div>
    <!-- /#page-content-wrapper -->

</div>

    <script src="/admin/js/vendor.js"></script>

    <script src="/admin/js/app.js"></script>

    <script type="text/javascript">
        ( function ( $ ) {
             $("#menu").metisMenu();
             $("#sidebar-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        } ) ( jQuery );
    </script>
    @yield('scripts')
</body>
</html>