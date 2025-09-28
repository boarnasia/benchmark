<?php

use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/ping', [AppController::class, 'ping']);
Route::get('/cpu-bound', [AppController::class, 'cpu_bound']);
Route::get('/io-bound', [AppController::class, 'io_bound']);
