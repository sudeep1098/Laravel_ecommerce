import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Banner from '@/Components/Banner';
import Categories from '@/Components/Categories';
import FeaturedProducts from '@/Components/FeaturedProducts';
import Testimonials from '@/Components/Testimonials';
import StatsSection from '@/Components/StatsSection';
import Footer from '@/Components/Footer';
import Highlights from '@/Components/Highlights';

export default function Welcome({ auth, categories, products }: { auth: any; categories: any, products: any }) {
    const banners = [
        { id: 1, image: '/images/banner1.jpg', title: 'Welcome to Brand Name' },
        { id: 2, image: '/images/banner2.jpg', title: 'Explore Our Categories' },
    ];

    const testimonials = [
        {
            id: 1,
            name: "Emily Johnson",
            designation: "Business Owner",
            message: "The quality and service were outstanding! I will definitely come back for more.",
        },
        {
            id: 2,
            name: "Michael Brown",
            designation: "Entrepreneur",
            message: "Quick delivery and fantastic customer support. Highly recommended!",
        },
        {
            id: 3,
            name: "Sophia Davis",
            designation: "Designer",
            message: "Absolutely love their products! They are stylish and durable.",
        },
        {
            id: 4,
            name: "James Wilson",
            designation: "Frequent Shopper",
            message: "The pricing is unbeatable, and the variety is impressive!",
        },
        {
            id: 5,
            name: "Olivia Martinez",
            designation: "Marketing Specialist",
            message: "Their attention to detail is remarkable. Every product feels premium.",
        },
        {
            id: 6,
            name: "William Garcia",
            designation: "Photographer",
            message: "I appreciate the eco-friendly packaging and high-quality materials.",
        },
        {
            id: 7,
            name: "Ava Robinson",
            designation: "Travel Blogger",
            message: "Perfect for gifting! My friends were delighted with their items.",
        },
        {
            id: 8,
            name: "Ethan Lee",
            designation: "Tech Enthusiast",
            message: "Seamless shopping experience. I found exactly what I needed in minutes!",
        },
    ];


    const stats = [
        { label: "Happy Customers", value: "10K+" },
        { label: "Products Sold", value: "50K+" },
        { label: "Active Categories", value: "100+" },
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 dark:bg-gray-900">
                <Navbar auth={auth} />
                <Banner banners={banners} />
                <Highlights />
                <Categories categories={categories} />
                <FeaturedProducts products={products} />
                <Testimonials testimonials={testimonials} />
                <StatsSection stats={stats} />
                <Footer />
            </div>
        </>
    );
}
