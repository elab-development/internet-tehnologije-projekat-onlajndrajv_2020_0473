<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'employee';
     public function toArray(Request $request): array
    {
        return [
            'user' => new UserResource($this->resource->user),
            'company' => new CompanyResource($this->resource->company),
        ];
    }
}