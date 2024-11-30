import React from 'react';

interface PaymentFailedProps {
    message?: string;
}

const PaymentFailed = ({ message = 'Your payment failed. Please try again.' }: PaymentFailedProps) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-red-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-4xl font-semibold text-red-600">Payment Failed</h1>
                <p className="mt-4 text-lg text-gray-700">{message}</p>
                <div className="mt-6">
                    <a href="/checkout" className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200">
                        Try Again
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
