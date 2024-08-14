<?php

namespace App\Http\Resources;

use DateTime;
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
        $dt = new DateTime($this->resource->created_at);
        return [
            'id' => $this->resource->id,
            'user' => new UserResource($this->resource->user),
            'company' => $this->resource->company->name,
            'employement_date' => $dt->format('d.m.Y.')
        ];
    }
}
