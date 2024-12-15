import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const Categories = ({ categories }: { categories: any }) => {
    return (
        <div className="container mx-auto py-12 px-6 overflow-hidden">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category: any, index: number) => (
                    <Link href={`/categories/${category.id}`} className="block" key={category.id}>
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold group-hover:text-[#FF2D20] transition-colors duration-300 text-gray-800 dark:text-gray-100">
                                    {category.name}
                                </h3>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
