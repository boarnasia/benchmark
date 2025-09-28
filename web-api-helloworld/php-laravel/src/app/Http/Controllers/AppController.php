<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
    public function ping()
    {
        return response()->json(['message' => 'pong']);
    }

    public function cpu_bound()
    {
        // Simulate a CPU-bound task
        for ($i = 0; $i < 1_000_000; $i++) {
            $j = $i + 1;
        }
        return response()->json(['message' => 'CPU Bound']);
    }

    public function io_bound()
    {
        sleep(0.02);
        return response()->json(['message' => 'IO Bound']);
    }
}
