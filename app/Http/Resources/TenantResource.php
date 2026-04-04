<?php

namespace App\Http\Resources;

use App\Models\Tenant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Tenant $group
 * @property Tenant $room
 * @property int $id
 * @property string $tenant_name
 * @property boolean $is_active
 * @property string $created_at
 * @property string $updated_at
 * @property string $created_by
 * @property string $modified_by
 */
class TenantResource extends JsonResource
{
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tenant_name' => $this->tenant_name,
            'is_active' => $this->is_active,
            'room' => new RoomResource($this->room),
            'group' => $this->group,
            'created_by' => new UserResource($this->createdBy),
            'modified_by' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
