<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory;

    protected $fillable = [
        'room_name',
        'group_id',
        'created_by',
        'modified_by'
    ];
    
    public function group(): BelongsTo {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function createdBy(): BelongsTo {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo {
        return $this->belongsTo(User::class, 'modified_by');
    }
}
