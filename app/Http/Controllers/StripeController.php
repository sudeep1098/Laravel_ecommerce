<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeController extends Controller
{
    // Display the checkout page
    public function paymentPage()
    {
        return Inertia::render('Stripe/Checkout'); // Renders the Checkout component
    }

    // Handle Stripe checkout process
    public function checkout(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'Sample Product',
                    ],
                    'unit_amount' => 1000,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('payment.success'),
            'cancel_url' => route('payment.failed'),
        ]);
        return response()->json(['id' => $session->id]);
    }

    // Display success page
    public function paymentSuccess()
    {
        return Inertia::render('Stripe/PaymentSuccess', [
            'message' => 'Your payment was successful!',
        ]);
    }

    // Display failure page
    public function paymentFailed()
    {
        return Inertia::render('Stripe/PaymentFailed', [
            'message' => 'Your payment failed. Please try again.',
        ]);
    }
}

