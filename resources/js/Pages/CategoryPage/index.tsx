import React from 'react';
import { Link } from '@inertiajs/react';

const CategoryPage = ({ category, products }: any) => {

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Banner Section */}
            <div className="relative">
                <img
                    src={category.image}
                    alt={`${category.name} Banner`}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-white text-4xl font-bold">{category.name}</h1>
                </div>
            </div>

            {/* Products Slider */}
            <div className="mt-10 px-6">
                <h2 className="text-2xl font-bold mb-4">Top Products</h2>
                <div className="flex overflow-x-auto gap-4">
                    {products.map((product: any, index: number) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="bg-white rounded-lg shadow-md w-64 p-4 flex-shrink-0"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">${product.price}</p>
                            <Link
                                href={`/products/${product.id}`}
                                className="mt-4 block bg-blue-500 text-white text-center py-2 rounded-md"
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

export default CategoryPage;
