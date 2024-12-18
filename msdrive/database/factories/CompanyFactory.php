<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        return [
            'name' => $this->faker->company,
            'owner_id' => $user->id,
            'description' => $this->faker->catchPhrase,
        ];
    }
}
