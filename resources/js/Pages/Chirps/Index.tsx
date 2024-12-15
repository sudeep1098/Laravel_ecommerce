import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Chirp from '@/Components/admin/Chirp';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head, router } from '@inertiajs/react';

export default function Index({ auth, chirps: initialChirps }: any) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const [chirps, setChirps] = useState(initialChirps.data);
    const [nextCursor, setNextCursor] = useState(initialChirps.next_page_url);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastChirpRef = useRef<HTMLDivElement | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };

    const loadMoreChirps = () => {
        if (!nextCursor || loading) return;

        setLoading(true);
        router.get(nextCursor, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: ({ props }: any) => {
                setChirps((prev: any) => [...prev, ...props.chirps.data]);
                setNextCursor(props.chirps.next_page_url);
                setLoading(false);
            },
            onError: () => setLoading(false),
        });
    };

    useEffect(() => {
        if (loading) return;

        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadMoreChirps();
            }
        };

        observer.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        });

        if (lastChirpRef.current) {
            observer.current.observe(lastChirpRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [nextCursor, loading]);

    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map((chirp: any, index: number) => (
                        <div key={chirp.id} ref={chirps.length === index + 1 ? lastChirpRef : null}>
                            <Chirp chirp={chirp} />
                        </div>
                    ))}
                </div>

                {loading && (
                    <div className="text-center mt-4">
                        <p>Loading more chirps...</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
