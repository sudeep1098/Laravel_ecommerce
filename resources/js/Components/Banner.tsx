// Carousel.tsx
import React from 'react';

const Carousel = ({ banners }: { banners: { id: number; image: string; title: string }[] }) => {
    return (
        <div className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-700">
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className="w-full h-64 flex-shrink-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${banner.image})` }}
                    >
                        <div className="bg-black/40 h-full flex items-center justify-center text-white">
                            <h1 className="text-3xl font-bold">{banner.title}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
