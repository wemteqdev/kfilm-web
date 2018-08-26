let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
 
mix.copy(
    'node_modules/metismenu/dist/metisMenu.min.js',
    'resources/assets/js/vendor'
).copy(
    'node_modules/metismenu/dist/metisMenu.min.css',
    'resources/assets/css/vendor'
);


mix.styles(['resources/assets/css/vendor/metisMenu.min.css'], 'public/admin/css/vendor.css');

mix.scripts(['resources/assets/js/vendor/jquery.min.js',
			 'resources/assets/js/vendor/metisMenu.min.js'], 'public/admin/js/vendor.js');

mix.js('resources/assets/js/app.js', 'public/admin/js');
mix.sass('resources/assets/sass/app.scss', 'public/admin/css');