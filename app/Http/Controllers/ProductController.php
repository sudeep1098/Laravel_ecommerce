<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::with('categories')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        Product::create($request->only('name'));

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        $categoryIds = $product->categories->pluck('id');
        $relatedProducts = Product::whereIn('id', function ($query) use ($categoryIds) {
            $query->select('product_id')
                ->from('category_products')
                ->whereIn('category_id', $categoryIds);
        })
        ->where('id', '!=', $product->id)
        ->take(5)
        ->get();

        return Inertia::render('ProductPage/index', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'image' => $product->image,
                'price' => $product->price,
            ],
            'relatedProducts' => $relatedProducts->map(fn($related) => [
                'id' => $related->id,
                'name' => $related->name,
                'image' => $related->image,
                'price' => $related->price,
            ]),
        ]);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $product->update($request->only('name'));

        return redirect()->route('products.index')->with('success', 'Category updated successfully!');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Category deleted successfully!');
    }
}
