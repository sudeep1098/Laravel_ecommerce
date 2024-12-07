import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const ProductPage = ({ product, relatedProducts }: any) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();

        Inertia.post('/cart', {
            product_id: product.id,
            quantity: quantity,
        }, {
            onSuccess: () => {
                alert('Product added to cart!');
            },
            onError: (errors) => {
                alert(errors.message || 'Something went wrong');
            },
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Product Details */}
            <div className="mt-10 px-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full md:w-1/2 h-64 object-cover rounded-md"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold">{product.name}</h2>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                            <p className="text-xl font-bold text-green-600 mt-4">
                                ${product.price}
                            </p>

                            {/* Add to Cart Form */}
                            <form onSubmit={handleAddToCart} className="mt-6 flex items-center space-x-4">
                                <input
                                    type="number"
                                    value={quantity}
                                    min="1"
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-16 border-gray-300 rounded text-center"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                                >
                                    Add to Cart
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Slider */}
            <div className="mt-10 px-6">
                <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                <div className="flex overflow-x-auto gap-4">
                    {relatedProducts.map((related: any) => (
                        <div
                            key={related.id}
                            className="bg-white rounded-lg shadow-md w-64 p-4 flex-shrink-0"
                        >
                            <img
                                src={related.image}
                                alt={related.name}
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <h3 className="mt-4 text-lg font-semibold">{related.name}</h3>
                            <p className="text-gray-600">${related.price}</p>
                            <Link
                                href={`/products/${related.id}`}
                                className="mt-4 block bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
