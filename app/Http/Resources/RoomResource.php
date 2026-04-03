<?php

namespace App\Http\Resources;

use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $room_name
 * @property Room $group
 * @property string $created_at
 * @property string $updated_at
 * @property string $created_by
 * @property string $modified_by
 */
class RoomResource extends JsonResource
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
            'room_name' => $this->room_name,
            'group' => $this->group,
            'created_by' => new UserResource($this->createdBy),
            'modified_by' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
