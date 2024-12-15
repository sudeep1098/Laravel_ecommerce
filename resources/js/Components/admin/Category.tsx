import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { Category as CategoryProps, Product } from '@/types/interface';

interface Props {
    category: CategoryProps;
    fetchLatestCategories: () => void;
}

export default function Category({ category, fetchLatestCategories }: Props) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: category.name,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('categories.update', category.id), {
            onSuccess: () => {
                setEditing(false);
                fetchLatestCategories();
            }
        });
    };

    return (
        <div className="p-6 flex space-x-2">
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">{category.name}</span>
                        <small className="ml-2 text-sm text-gray-600">{new Date(category.created_at).toLocaleDateString()}</small>
                        {category.created_at !== category.updated_at && (
                            <small className="text-sm text-gray-600"> &middot; edited</small>
                        )}
                    </div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button
                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </button>
                            <Dropdown.Link as="button" href={route('categories.destroy', category.id)} method="delete">
                                Delete
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                {editing ? (
                    <form onSubmit={submit}>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        />
                        <InputError message={errors.name} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button
                                className="mt-4"
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="mt-4 text-lg text-gray-900">{category.name}</p>
                        {category.products.map((product: Product) => (
                            <p key={product.id} className="text-gray-800">{product.name}</p>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
