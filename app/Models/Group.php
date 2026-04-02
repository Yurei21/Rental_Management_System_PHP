<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    /** @use HasFactory<\Database\Factories\GroupFactory> */
    use HasFactory;

    protected $fillable = [
        'group_name'
    ];

    public function owner(): BelongsTo {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'group_members');
    }

    public function tenants(): HasMany {
        return $this->hasMany(Tenant::class);
    }

    public function rooms(): HasMany {
        return $this->hasMany(Room::class);
    }

}
