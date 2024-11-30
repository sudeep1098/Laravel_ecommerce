<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_transaction_refunds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_transaction_id');
            $table->decimal('refund_amount', 10, 2);
            $table->string('refund_status')->default('pending');
            $table->string('reason');
            $table->timestamps();

            $table->foreign('order_transaction_id')->references('id')->on('order_transactions')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_transaction_refunds');
    }
};

