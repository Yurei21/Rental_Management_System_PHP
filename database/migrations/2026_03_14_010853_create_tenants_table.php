<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')
                ->constrained('rooms')
                ->cascadeOnDelete();
            $table->string('tenant_name');
            $table->boolean('is_active')->default(true);
            $table->foreignId('group_id')
                ->nullable()
                ->constrained('groups')
                ->nullOnDelete();
            $table->foreignId('created_by')
                ->constrained('users');
            $table->foreignId('modified_by')
                ->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
