<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Employee;
use App\Models\File;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory(5)->create();

        Company::factory(3)->create();

        File::factory(15)->create();

        Employee::factory()->create();
        Employee::factory()->create();
        Employee::factory()->create();
        Employee::factory()->create();
        Employee::factory()->create();


        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
