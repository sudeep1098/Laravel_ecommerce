<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\CategoryProduct;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderTransaction;
use App\Models\OrderLog;
use App\Models\OrderTransactionRefund;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed users
        $users = User::factory(10)->create();
        // $users = User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Seed categories
        Category::factory(5)->create();

        // Seed products
        Product::factory(20)->create();

        // Seed category_product table (many-to-many)
        CategoryProduct::factory(20)->create();

        // Seed carts for each user
        foreach ($users as $user) {
            Cart::factory()->create([
                'user_id' => $user->id,
            ]);
        }

        // Seed cart items
        CartItem::factory(50)->create();

        // Seed orders
        Order::factory(15)->create();

        // Seed order items
        OrderItem::factory(50)->create();

        // Seed order transactions
        OrderTransaction::factory(20)->create();

        // Seed order logs
        OrderLog::factory(30)->create();

        // Seed order transaction refunds
        OrderTransactionRefund::factory(10)->create();
    }
}

