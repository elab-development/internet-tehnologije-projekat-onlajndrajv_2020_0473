<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::pluck('id')->toArray();
        return [
            'user_id'=> fake()->randomElement($users),
            'name'=>fake()->sentence(1),
            'size'=>fake()->randomFloat(),
            'mime_type'=>fake()->mimeType(),
            'content'=>fake()->randomDigitNotZero(),
        ];
    }
}
