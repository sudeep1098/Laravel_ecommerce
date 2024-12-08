import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { a } from 'motion/react-client';

const Testimonials = ({ testimonials }: { testimonials: any[] }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        infinite: true,
        speed: 400,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        arrows: false,
        autoplay: true,
        beforeChange: (_: any, next: any) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '40px',
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '20px',
                },
            },
        ],
    };

    return (
        <div className="py-12 px-6 bg-gray-50 dark:bg-gray-900">
            <div className="slider-container container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                    What Our Customers Say
                </h2>
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`flex justify-center px-4 transition-transform duration-300 ${
                                activeSlide === index
                                    ? 'scale-105 z-10'
                                    : 'scale-95 opacity-75'
                            }`}
                        >
                            <div className="flex-shrink-0 w-full h-full rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <p className="italic text-gray-600 dark:text-gray-300">
                                    "{testimonial.message}"
                                </p>
                                <div className="flex flex-col mt-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {testimonial.designation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Testimonials;
