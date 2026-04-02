<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tenant extends Model
{
    /** @use HasFactory<\Database\Factories\TenantFactory> */
    use HasFactory;

    protected $fillable = [
        'room_id',
        'tenant_name',
        'is_active',
        'group_id',
        'created_by',
        'modified_by'
    ];

    public function room(): BelongsTo {
        return $this->belongsTo(Room::class, 'room_id');
    }

    public function group(): BelongsTo {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function invoice(): HasMany {
        return $this->hasMany(Invoice::class);
    }

    public function payment(): HasMany {
        return $this->hasMany(Payment::class);
    }

    public function createdBy(): BelongsTo {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo {
        return $this->belongsto(User::class, 'modified_by');
    }
}
