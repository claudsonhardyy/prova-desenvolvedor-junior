<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="antialiased">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    {{-- Aplica tema salvo no localStorage antes do paint para evitar flash --}}
    <script>
      (function() {
        try {
          var theme = localStorage.getItem('theme');
          if (theme === 'dark') document.documentElement.classList.add('dark');
        } catch(e) {}
      })();
    </script>

    @routes
    @viteReactRefresh
    @vite(['resources/css/app.css','resources/js/app.jsx'])
    @inertiaHead
  </head>
  <body class="font-sans antialiased bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
    @inertia
  </body>
</html>
