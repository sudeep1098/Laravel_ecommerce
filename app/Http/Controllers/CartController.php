<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class CartController extends Controller
{
    private ?Cart $cart = null;
    private ?User $user = null;

    public function __construct()
    {
        $this->user = auth()->user();
        $this->cart = $this->user->carts()->first();
    }

    public function index()
    {
        // Ensure the cart exists for the user
        $cart = Cart::firstOrCreate(['user_id' => $this->user->id], [
            'data' => '[]',
            'quantity' => 0,
            'total_amount' => 0.00,
        ]);

        $items = $cart->items()->get()->map(function ($item) {
            $data = json_decode($item->data, true);
            return [
                'id' => $item->id,
                'quantity' => $item->quantity,
                'subtotal' => $item->total_amount,
                'data' => $data
            ];
        });

        return inertia('Cart/index', [
            'cart' => [
                'id' => $cart->id,
                'total_quantity' => $cart->quantity,
                'total_amount' => $cart->total_amount,
                'items' => $items,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $product = Product::findOrFail($request->product_id);

        // Ensure the cart exists for the user
        $cart = Cart::firstOrCreate(['user_id' => $this->user->id], [
            'data' => '[]',
            'quantity' => 0,
            'total_amount' => 0.00,
        ]);

        $data = [
            'product' => [
                'id' => $product->id,
                'product_name' => $product->name,
                'price' => $product->price,
                'image' => $product->image,
                'sku' => $product->sku,
            ],
            'quantity' => $request->quantity,
            'subtotal' => $product->price * $request->quantity,
        ];

        $cart->items()->create([
            'cart_id' => $cart->id,
            'quantity' => $request->quantity,
            'data' => json_encode($data),
            'total_amount' => $data['subtotal'],
        ]);
        $cart->data = json_encode($cart->items->map(fn($item) => json_decode($item->data, true)));
        $cart->quantity = $cart->items->sum('quantity');
        $cart->total_amount = $cart->items->sum(fn($item) => $item->total_amount);
        $cart->save();
        return redirect()->route('cart.index')->with('success', 'Item added to cart.');
    }

    public function update(Request $request, $cartId, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::findOrFail($cartId);
        $cartItem = $cart->items()->findOrFail($itemId);

        $data = json_decode($cartItem->data, true);
        $data['quantity'] = $request->quantity;
        $data['subtotal'] = $data['product']['price'] * $request->quantity;
        $cartItem->total_amount = $data['subtotal'];
        $cartItem->quantity = $request->quantity;
        $cartItem->data = json_encode($data);
        $cartItem->save();

        $cart->data = json_encode($cart->items->map(fn($item) => json_decode($item->data, true)));
        $cart->quantity = $cart->items->sum('quantity');
        $cart->total_amount = $cart->items->sum(fn($item) => $item->total_amount);
        $cart->save();

        return redirect()->route('cart.index')->with('success', 'Item updated to cart.');
    }

    public function destroy($cartId, $itemId)
    {
        $cart = Cart::findOrFail($cartId);
        $cartItem = $cart->items()->findOrFail($itemId);
        $cartItem->delete();

        $cart->data = json_encode($cart->items->map(fn($item) => json_decode($item->data, true)));
        $cart->quantity = $cart->items->sum('quantity');
        $cart->total_amount = $cart->items->sum(fn($item) => $item->total_amount);
        $cart->save();

        return redirect()->route('cart.index')->with('success', 'Item deleted to cart.');
    }
}
