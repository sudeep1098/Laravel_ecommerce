import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move 50px below
            animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and original position
            transition={{ duration: 0.8, ease: 'easeOut' }} // Smooth transition
            className="bg-gray-800 text-white py-6 px-6"
        >
            <div className="container mx-auto flex justify-between items-center">
                <p>© 2024 Brand Name. All rights reserved.</p>
                <nav className="flex space-x-4">
                    <Link
                        href="/"
                        className="hover:underline decoration-[#FF2D20] underline-offset-4 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="hover:underline decoration-[#FF2D20] underline-offset-4 transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:underline decoration-[#FF2D20] underline-offset-4 transition-colors"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </motion.footer>
    );
};

export default Footer;
