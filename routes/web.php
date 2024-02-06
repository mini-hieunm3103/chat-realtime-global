<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('chat');
})->middleware('auth');

Auth::routes();

Route::group(
    [
        'prefix' => 'message',
        'name' => 'message.',
//        'middleware' => 'auth'
    ],
    function (){
        Route::get('/', [MessageController::class, 'index'])->name('index');
        Route::post('/', [MessageController::class, 'store'])->name('store');
    });
Route::get('/current-login', function (){
    return \Illuminate\Support\Facades\Auth::user();
});
