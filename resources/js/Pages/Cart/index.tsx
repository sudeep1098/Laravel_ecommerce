import React from "react";
import { Inertia } from "@inertiajs/inertia";

const CartPage = ({ cart }: any) => {
    const handleRemoveItem = (itemId: string) => {
        Inertia.delete(`/cart/${cart.id}/items/${itemId}`, {
            onSuccess: () => {
                alert("Item removed from cart");
            },
            onError: (error) => {
                alert(error.message || "Error removing item");
            },
        });
    };

    const handleUpdateQuantity = (itemId: string, quantity: number) => {
        Inertia.patch(`/cart/${cart.id}/items/${itemId}`, {
            quantity: quantity,
        }, {
            onSuccess: () => {
                alert("Cart updated");
            },
            onError: (error) => {
                alert(error.message || "Error updating cart");
            },
        });
    };

    const { items, total_quantity, total_amount } = cart;

    return (
        <div className="bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center my-6">Your Cart</h2>

            <div className="container mx-auto px-6">
                {items.length === 0 ? (
                    <p className="text-center text-xl">Your cart is empty</p>
                ) : (
                    items.map((item: any) => {
                        const productData = item.data.product;
                        return (
                            <div
                                key={item.id}
                                className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-4"
                            >
                                <div className="flex items-center">
                                    <a
                                        href={`/products/${productData.id}`} // Adjust the link based on your routing
                                        className="flex items-center"
                                    >
                                        <img
                                            src={productData.image}
                                            alt={productData.product_name}
                                            className="w-16 h-16 object-cover rounded-md mr-4"
                                        />
                                        <div>
                                            <p className="font-semibold text-blue-500 hover:underline">
                                                {productData.product_name}
                                            </p>
                                        </div>
                                    </a>
                                    <div className="ml-4">
                                        <p>SKU: {productData.sku}</p>
                                        <p>Price: ${productData.price}</p>
                                        <p>
                                            Quantity:
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) =>
                                                    handleUpdateQuantity(item.id, Number(e.target.value))
                                                }
                                                className="w-16 border-gray-300 rounded text-center"
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-lg font-semibold">
                                        Subtotal: ${item.subtotal}
                                    </p>
                                    <div className="mt-2 flex gap-2">
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded-md"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div className="flex justify-end text-xl font-semibold mt-6">
                    <p>Total Items: {total_quantity}</p>
                </div>
                <div className="flex justify-end text-xl font-semibold mt-2">
                    <p>Total Price: ${total_amount}</p>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
