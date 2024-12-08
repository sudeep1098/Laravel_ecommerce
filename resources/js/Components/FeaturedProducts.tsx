import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@inertiajs/react'; // Import Link for navigation
import { useState } from 'react';

const FeaturedProducts = ({ products }: { products: any[] }) => {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const handleViewDetails = (e: any, product: any) => {
        e.preventDefault();
        setSelectedProduct(product);
    };
    return (
        <div className="container mx-auto py-12 px-6 overflow-hidden">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
                Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Animation based on index
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    >
                        <Link href={`/products/${product.id}`} className="block">
                            {/* Product Image */}
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-cover group-hover:opacity-75"
                                />
                                <motion.div
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    <button onClick={(e: any) => handleViewDetails(e, product)} className="text-white bg-[#FF2D20] py-2 px-4 rounded-md font-semibold">
                                        View Details
                                    </button>
                                </motion.div>
                            </div>

                            {/* Product Details */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-[#FF2D20] transition-colors duration-300">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">${product.price}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        key="modal"
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-8 rounded-lg max-w-lg w-full"
                            layoutId={`product-modal-${selectedProduct.id}`}
                        >
                            <h3 className="text-2xl font-semibold">{selectedProduct.name}</h3>
                            <p>{selectedProduct.description}</p>
                            <button
                                className="mt-4 text-white bg-[#FF2D20] py-2 px-4 rounded-md"
                                onClick={() => setSelectedProduct(null)} // Close modal
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FeaturedProducts;
