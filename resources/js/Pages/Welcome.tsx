import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth, categories }: PageProps<{ categories: any }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 text-black/80 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black dark:text-white/70 min-h-screen">
                <header className="container mx-auto flex items-center justify-between py-6 px-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[#FF2D20]">Brand Name</h1>
                    </div>
                    <nav className="space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-sm font-semibold text-black hover:text-[#FF2D20] dark:text-white dark:hover:text-[#FF2D20] transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-semibold text-black hover:text-[#FF2D20] dark:text-white dark:hover:text-[#FF2D20] transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="text-sm font-semibold text-black hover:text-[#FF2D20] dark:text-white dark:hover:text-[#FF2D20] transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="container mx-auto py-12 px-6">
                    <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-gray-100">
                        Explore Our Categories
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((category: any) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.id}`}
                                className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-40 object-cover"
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                'https://via.placeholder.com/150?text=No+Image')
                                        }
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-[#FF2D20]">
                                        {category.name}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
