<?php

namespace Database\Factories;

use App\Models\Company;
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
        $company = Company::inRandomOrder()->first() ?? Company::factory()->create();

        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        return [
            'name' => $this->faker->word . '.' . $this->faker->fileExtension,
            'path' => $this->faker->filePath(),
            'description' => $this->faker->paragraph(1),
            'company_id' => $company->id,
        ];
    }
}
