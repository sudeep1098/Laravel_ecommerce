<?php

namespace Database\Factories;

use App\Models\CartItem;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartItemFactory extends Factory
{
    protected $model = CartItem::class;

    public function definition()
    {
        $product = Product::inRandomOrder()->first();

        return [
            'cart_id' => Cart::inRandomOrder()->first()->id,
            'data' => '[]',
            'quantity' => $this->faker->numberBetween(1, 5),
            'total_amount' => $product->price * $this->faker->numberBetween(1, 5),
        ];
    }
}
