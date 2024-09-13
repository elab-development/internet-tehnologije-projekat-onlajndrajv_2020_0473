<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $company = Company::inRandomOrder()->first();

        $user = User::inRandomOrder()->first();

        echo " Pre petlje: ";
        echo $user->id;
        
        while (Employee::where('user_id', $user->id)->exists()) {
            $user = User::inRandomOrder()->first();
            echo " U petlji promenjen na: ";
            echo $user->id;
        }
        
        echo " Nakon petlje: ";
        echo $user->id;
        echo "\n";

        return [
            'company_id' => $company->id,
            'user_id' => $user->id,
        ];
    }
}
