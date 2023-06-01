<?php

use Illuminate\Support\Facades\Route;
use App\Models\Tender;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');

});

Route::get('api',function(){

    $tender=Tender::with(['submittedBy','refferedTo'])->get();
    $json_string = json_encode($tender, JSON_PRETTY_PRINT);
    echo "<pre>$json_string</pre>";
    echo "<br>";
    echo "<hr>";
    echo "<br>";
    $users=User::with('userType')->get();
        $json_string = json_encode($users, JSON_PRETTY_PRINT);

    echo "<pre>$json_string</pre>";

});

Route::get('symlink',function(){
    $targetFolder = $_SERVER['DOCUMENT_ROOT'].'/storage/app/public';
    $linkFolder = $_SERVER['DOCUMENT_ROOT'].'/public/storage';
    symlink($targetFolder,$linkFolder);
    echo 'Symlink process successfully completed';
});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

