<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $categories = \App\Models\Category::all();
    $products = \App\Models\Product::all();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => \Illuminate\Foundation\Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'categories' => $categories,
        'products' => $products,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('products/{product}', [ProductController::class, 'show'])->name('products.show');

// Admin Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Chirps
    Route::resource('chirps', ChirpController::class)->only(['index', 'store', 'update', 'destroy']);

    // Categories
    Route::resource('categories', CategoryController::class)->only(['index', 'store', 'update', 'destroy']);

    // Products
    Route::resource('products', ProductController::class)->only(['index', 'store', 'update', 'destroy']);
});
// Cart
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::patch('/cart/{cartId}/items/{itemId}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{cartId}/items/{itemId}', [CartController::class, 'destroy'])->name('cart.destroy');

// Stripe
Route::prefix('stripe')->name('stripe.')->group(function () {
    Route::get('/checkout', [StripeController::class, 'paymentPage'])->name('checkout.page');
    Route::post('/checkout', [StripeController::class, 'checkout'])->name('checkout');
    Route::get('/payment-success', [StripeController::class, 'paymentSuccess'])->name('payment.success');
    Route::get('/payment-failed', [StripeController::class, 'paymentFailed'])->name('payment.failed');
    Route::post('/webhook', [StripeController::class, 'webhook'])->name('webhook');
});

// Include Auth Routes
require __DIR__ . '/auth.php';
