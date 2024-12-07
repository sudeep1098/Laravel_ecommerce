<?php

namespace Database\Factories;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartFactory extends Factory
{
    protected $model = Cart::class;

    public function definition()
    {
        $user = User::inRandomOrder()->first();
        $product = Product::inRandomOrder()->first();

        return [
            'user_id' => $user->id,
            'data' => '[]',
            'quantity' => $this->faker->numberBetween(1, 5),
            'total_amount' => $product->price * $this->faker->numberBetween(1, 5),
        ];
    }
}
