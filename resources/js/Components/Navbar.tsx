import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import SearchBar from './SearchBar';

const Navbar = ({ auth, products }: { auth: any, products: any }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prevState) => !prevState);
    };

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Categories', href: '/categories' },
        { name: 'Dashboard', href: route('dashboard') },
        { name: 'Log in', href: route('login') },
        { name: 'Register', href: route('register') },
    ];

    // Filter out the 'Dashboard', 'Log in', and 'Register' items based on authentication
    const filteredNavItems = navItems.filter(item => {
        if (auth.user) {
            return item.name !== 'Log in' && item.name !== 'Register';
        }
        return item.name !== 'Dashboard';
    });

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50"
        >
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link href="/" className="text-2xl font-bold text-[#FF2D20]">
                    Brand Name
                </Link>

                {/* Search Bar */}
                <div className="hidden md:block w-1/2">
                    <SearchBar products={products} />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {filteredNavItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="text-gray-800 dark:text-gray-200 hover:text-[#FF2D20] transition-colors duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Navigation Menu */}
                <div className="md:hidden">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMobileMenu}
                        className="text-gray-800 dark:text-gray-200 focus:outline-none"
                    >
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </motion.svg>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Sidebar Menu (Sliding effect) */}
            <motion.div
                className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
                initial={{ x: '-100%' }}
                animate={{ x: isMobileMenuOpen ? 0 : '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <motion.div
                    className="bg-white dark:bg-gray-900 p-6 w-64 h-full relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                    {/* Close Button */}
                    <motion.button
                        onClick={toggleMobileMenu}
                        className="text-gray-800 dark:text-gray-200 absolute top-4 right-4 focus:outline-none"
                    >
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </motion.svg>
                    </motion.button>

                    {/* Navigation Items */}
                    <nav className="space-y-4">
                        {filteredNavItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 20,
                                    delay: 0.3 + index * 0.1, // Stagger animation
                                }}
                            >
                                <Link
                                    href={item.href}
                                    className="text-gray-800 dark:text-gray-200 hover:text-[#FF2D20] block text-lg"
                                    onClick={() => setIsMobileMenuOpen(false)} // Close the menu after clicking
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </motion.div>
            </motion.div>
        </motion.header>
    );
};

export default Navbar;
