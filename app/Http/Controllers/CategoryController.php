<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Categories/Index', [
            'categories' => Category::with('products')->paginate(10)
        ]);
    }

    public function create() {}

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        Category::create($request->only('name'));

        return redirect()->route('categories.index')->with('success', 'Category created successfully!');
    }

    public function edit(Category $category) {}

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category->update($request->only('name'));

        return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully!');
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        $products = $category->products()->take(10)->get();

        return Inertia::render('CategoryPage/index', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'image' => $category->image,
            ],
            'products' => $products->map(fn($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'image' => $product->image,
                'price' => $product->price,
            ]),
        ]);
    }

}
