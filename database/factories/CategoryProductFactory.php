<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\CategoryProduct;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryProductFactory extends Factory
{
    protected $model = CategoryProduct::class;

    public function definition()
    {
        $categoryId = Category::inRandomOrder()->first()->id;
        $productId = Product::inRandomOrder()->first()->id;

        CategoryProduct::firstOrCreate([
            'category_id' => $categoryId,
            'product_id' => $productId,
        ]);

        return [
            'category_id' => $categoryId,
            'product_id' => $productId,
        ];
    }
}
