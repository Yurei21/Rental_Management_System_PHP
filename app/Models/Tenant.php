<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function room() {
        return $this->belongsTo(Room::class, 'room_id');
    }

    public function group() {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function invoice() {
        return $this->hasMany(Invoice::class);
    }

    public function payment() {
        return $this->hasMany(Payment::class);
    }

    public function createdBy() {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy() {
        return $this->belongsto(User::class, 'modified_by');
    }
}
