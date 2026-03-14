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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('receipt_number')->unique();
            $table->foreignId('tenant_id')
                ->constrained('tenants')
                ->cascadeOnDelete();
            $table->integer('amount');
            $table->date('billing_date');
            $table->date('due_date');
            $table->enum('status', ['Pending', 'Paid', 'Overdue'])->default('Pending');
            $table->text('description')->nullable();
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
        Schema::dropIfExists('invoices');
    }
};
