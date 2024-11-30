<?php

namespace Database\Factories;

use App\Models\Cart;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        $cart = Cart::inRandomOrder()->first();

        return [
            'user_id' => $cart ? $cart->user_id : User::inRandomOrder()->first()->id,
            'cart_id' => $cart ?? $cart->id,
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed']),
            'total_amount' => $cart
                ? $cart->items->sum('price')
                : $this->faker->randomFloat(2, 10, 500),
        ];
    }
}
