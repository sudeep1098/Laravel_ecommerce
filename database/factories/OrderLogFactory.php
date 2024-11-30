<?php

namespace Database\Factories;

use App\Models\OrderLog;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderLogFactory extends Factory
{
    protected $model = OrderLog::class;

    public function definition()
    {
        return [
            'order_id' => Order::inRandomOrder()->first()->id,
            'message' => $this->faker->sentence,
        ];
    }
}

