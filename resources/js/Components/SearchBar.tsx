import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

const SearchBar = ({ products }: { products: any[] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredProducts([]);
            return;
        }

        const matches = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(matches);
    };

    return (
        <div className="relative w-full md:w-1/2">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF2D20] focus:border-transparent"
            />

            {filteredProducts.length > 0 && (
                <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-full bg-white dark:bg-gray-900 shadow-lg rounded-md z-50 overflow-hidden"
                >
                    {filteredProducts.map((product, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-800 dark:text-gray-200">
                            <Link href={`/products/${product.id}`} className="block">
                                {product.name}
                            </Link>
                        </li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
};

export default SearchBar;
