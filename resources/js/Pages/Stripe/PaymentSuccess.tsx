import React from 'react';

interface PaymentSuccessProps {
    message?: string;
}

const PaymentSuccess = ({ message = 'Your payment was successful!' }: PaymentSuccessProps) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-4xl font-semibold text-green-600">Payment Successful</h1>
                <p className="mt-4 text-lg text-gray-700">{message}</p>
                <div className="mt-6">
                    <a
                        href="/stripe/checkout" // URL to navigate to the checkout page
                        className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Go to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
