import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head, router } from '@inertiajs/react';
import ProductComponent from '@/Components/admin/Product';
import { Product } from '@/types/interface';

interface Props {
    auth: any;
    products: any;
}

export default function Index({ auth, products: initialProducts }: Props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
    });

    const [products, setProducts] = useState(initialProducts);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => {
                reset();
                fetchLatestProducts();
            },
        });
    };

    const fetchLatestProducts = () => {
        router.get(route('products.index'), {}, {
            preserveState: true,
            onSuccess: (page) => {
                setProducts(page.props.products);
            }
        });
    };

    const fetchPage = (url: string | null) => {
        if (url) {
            router.get(url, {}, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setProducts(page.props.products);
                }
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Products" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.name}
                        placeholder="Add a new product"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Add Product
                    </PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {products.data.map((product: Product) => (
                        <div key={product.id}>
                            <ProductComponent product={product} fetchLatestProducts={fetchLatestProducts} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Links */}
            <div className="flex space-x-2 justify-center">
                {products.links.map((link: any, index: number) => (
                    <button
                        key={index}
                        onClick={() => fetchPage(link.url)}
                        className={`px-4 py-2 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
