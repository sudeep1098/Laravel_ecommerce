<?php

namespace Database\Factories;

use App\Models\OrderTransactionRefund;
use App\Models\OrderTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderTransactionRefundFactory extends Factory
{
    protected $model = OrderTransactionRefund::class;

    public function definition()
    {
        return [
            'order_transaction_id' => OrderTransaction::inRandomOrder()->first()->id,
            'refund_amount' => $this->faker->randomFloat(2, 5, 100),
            'reason' => $this->faker->sentence,
        ];
    }
}
