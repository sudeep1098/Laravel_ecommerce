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
        Stripe::setApiKey(config('services.stripe.secret'));

        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $payload = $request->getContent();

        try {
            $event = Webhook::constructEvent(
                $payload,
                $sig_header,
                config('services.stripe.webhook')
            );
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error('Stripe webhook signature verification failed.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid signature'], 400);
        } catch (\UnexpectedValueException $e) {
            Log::error('Invalid Stripe webhook payload.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid payload'], 400);
        }

        try {
            switch ($event->type) {
                case 'payment_intent.succeeded':
                    $this->handlePaymentIntentSucceeded($event->data->object);
                    break;

                case 'checkout.session.completed':
                    $this->handleCheckoutSessionCompleted($event->data->object);
                    break;

                default:
                    Log::info('Unhandled event type: ' . $event->type);
                    break;
            }
        } catch (\Exception $e) {
            Log::error('Error handling Stripe webhook.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Webhook handling error'], 500);
        }

        return response()->json(['status' => 'success'], 200);
    }

    protected function handlePaymentIntentSucceeded($paymentIntent)
    {
        // Find the order transaction by the Stripe payment intent ID
        $orderTransaction = OrderTransaction::latest()->first();

        if ($orderTransaction) {
            $orderTransaction->update(['status' => 'succeeded']);

            $order = $orderTransaction->order;
            if ($order) {
                $order->update(['status' => 'paid']);
            }
        }
    }

    protected function handleCheckoutSessionCompleted($session)
    {
        $orderTransaction = OrderTransaction::latest()->first();

        if ($orderTransaction) {
            $orderTransaction->update(['status' => 'succeeded']);
            $order = $orderTransaction->order;

            if ($order) {
                $order->update(['status' => 'paid']);
            }
        }
    }

    public function paymentSuccess()
    {
        return Inertia::render('Stripe/PaymentSuccess', [
            'message' => 'Your payment was successful!',
        ]);
    }

    public function paymentFailed()
    {
        return Inertia::render('Stripe/PaymentFailed', [
            'message' => 'Your payment failed. Please try again.',
        ]);
    }
}
