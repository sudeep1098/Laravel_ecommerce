<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderLog;
use App\Models\OrderTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Customer;
use Stripe\Invoice;
use Stripe\Webhook;

class StripeController extends Controller
{
    public function paymentPage()
    {
        return Inertia::render('Stripe/Checkout');
    }

    // Handle Stripe checkout process
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'cart_id' => 'required|exists:carts,id',
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $user = Auth::user();
        // Create a Stripe customer
        $customer = Customer::create([
            'email' => $user->email,
            'name' => $user->name,
        ]);

        $session = Session::create([
            'payment_method_types' => ['card'],
            'customer' => $customer->id,
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
            'success_url' => route('stripe.payment.success'),
            'cancel_url' => route('stripe.payment.failed'),
        ]);

        $order = Order::create([
            'user_id' => $user->id,
            'status' => 'pending',
            'cart_id' => $validated['cart_id'],
            'total_amount' => 10.00,
        ]);

        OrderTransaction::create([
            'order_id' => $order->id,
            'transaction_id' => $session->id,
            'amount' => $order->total_amount,
            'status' => $order->status,
        ]);

        OrderLog::create([
            'order_id' => $order->id,
            'status' => $order->status,
            'message' => 'Order has been Received'
        ]);

        return response()->json(['id' => $session->id]);
    }

    public function webhook(Request $request)
    {
        // Retrieve Stripe signature header
        $sigHeader = $request->header('Stripe-Signature');

        // Retrieve the request's raw body
        $payload = $request->getContent();

        try {
            // Verify the payload using the signing secret
            $event = Webhook::constructEvent(
                $payload,
                $sigHeader,
                config('services.stripe.webhook')
            );
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            Log::error('Stripe webhook signature verification failed.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid signature'], 400);
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            Log::error('Invalid Stripe webhook payload.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid payload'], 400);
        }

        // Handle the event
        switch ($event->type) {
            case 'payment_intent.succeeded':
                $paymentIntent = $event->data->object; // contains a \Stripe\PaymentIntent
                $this->handlePaymentIntentSucceeded($paymentIntent);
                break;

            case 'checkout.session.completed':
                $session = $event->data->object; // contains a \Stripe\Checkout\Session
                $this->handleCheckoutSessionCompleted($session);
                break;

            default:
                Log::info('Unhandled event type: ' . $event->type);
                break;
        }

        // Acknowledge receipt of the event
        return response()->json(['status' => 'success'], 200);
    }

    // Example handler for payment intent succeeded
    protected function handlePaymentIntentSucceeded($paymentIntent)
    {
        // Find the order transaction by the Stripe payment intent ID
        $orderTransaction = OrderTransaction::where('transaction_id', $paymentIntent->id)->first();

        if ($orderTransaction) {
            // Update transaction status
            $orderTransaction->update(['status' => 'succeeded']);

            // Update related order status
            $order = $orderTransaction->order;
            if ($order) {
                $order->update(['status' => 'paid']);
            }
        }
    }

    // Example handler for checkout session completed
    protected function handleCheckoutSessionCompleted($session)
    {
        $orderTransaction = OrderTransaction::where('transaction_id', $session->payment_intent)->first();

        if ($orderTransaction) {
            $orderTransaction->update(['status' => 'succeeded']);
            $order = $orderTransaction->order;

            if ($order) {
                $order->update(['status' => 'paid']);
            }
        }
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
