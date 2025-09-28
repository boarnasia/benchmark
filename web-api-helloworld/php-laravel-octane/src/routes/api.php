<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API Test successful',
        'timestamp' => now(),
        'server' => 'Laravel with Swoole'
    ]);
});

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
