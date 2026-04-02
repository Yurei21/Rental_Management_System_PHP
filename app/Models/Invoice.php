<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceFactory> */
    use HasFactory;

    protected $fillable = [
        'receipt_number',
        'tenant_id',
        'amount',
        'billing_date',
        'due_date',
        'status',
        'description',
        'created_by',
        'modified_by'
    ];

    public function payments(): HasMany {
        return $this->hasMany(Payment::class);
    }
    public function tenant(): BelongsTo {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }
    public function createdBy(): BelongsTo {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(): BelongsTo {
        return $this->belongsTo(User::class, 'modified_by');
    }
}
