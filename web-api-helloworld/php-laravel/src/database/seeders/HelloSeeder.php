<?php

namespace Database\Seeders;

use App\Models\Hello;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HelloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Hello::create([
            'message' => 'Hello, World!'
        ]);
    }
}
