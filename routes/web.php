<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('categories', CategoryController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('products', ProductController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::prefix('stripe')->name('stripe.')->group(function () {
    Route::get('/checkout', [StripeController::class, 'paymentPage'])->name('checkout.page');
    Route::post('/checkout', [StripeController::class, 'checkout'])->name('checkout');
    Route::get('/payment-success', [StripeController::class, 'paymentSuccess'])->name('payment.success');
    Route::get('/payment-failed', [StripeController::class, 'paymentFailed'])->name('payment.failed');
    Route::post('/webhook', [StripeController::class, 'webhook'])->name('webhook');
});


require __DIR__ . '/auth.php';
