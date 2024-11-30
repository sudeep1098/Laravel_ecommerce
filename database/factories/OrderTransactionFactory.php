<?php

namespace Database\Factories;

use App\Models\OrderTransaction;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderTransactionFactory extends Factory
{
    protected $model = OrderTransaction::class;

    public function definition()
    {
        return [
            'order_id' => Order::inRandomOrder()->first()->id,
            'transaction_id' => $this->faker->uuid,
            'amount' => $this->faker->randomFloat(2, 5, 100),
            'status' => $this->faker->randomElement(['success', 'failed']),
        ];
    }
}
