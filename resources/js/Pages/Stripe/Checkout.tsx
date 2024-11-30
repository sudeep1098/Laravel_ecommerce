import { useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Q59mfAMl5nMmtFxfR98FQHtAjCN3jAcASAD3aAFMXVpoL9E3d6k4swakejKblr0hiCubMp5fZsRYwx6RHFhVSLs00o5j4I3dT");

interface CheckoutSessionResponse {
    id: string;
}

const Checkout = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleCheckout = async () => {
        setLoading(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

            const response = await fetch("/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken || "",
                },
            });

            const session: CheckoutSessionResponse = await response.json();

            const stripe: Stripe | null = await stripePromise;

            if (!stripe) {
                throw new Error("Stripe.js failed to load.");
            }

            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (error) {
                console.error("Error during checkout:", error);
                alert("Checkout failed. Please try again.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-2xl font-semibold text-center text-gray-800">Stubborn Attachments</h3>
                <img
                    src="https://i.imgur.com/EHyR2nP.png"
                    alt="Product"
                    className="w-full h-56 object-cover mt-4 rounded-lg"
                />
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-gray-700">$10.00</p>
                </div>
                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? "Processing..." : "Checkout"}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
