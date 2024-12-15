import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Testimonials = ({ testimonials }: { testimonials: any[] }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <div className="py-12 px-6 bg-gray-50 dark:bg-gray-900">
            <div className="slider-container container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                    What Our Customers Say
                </h2>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    loop
                    spaceBetween={10}
                    slidesPerView={5}
                    centeredSlides={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        1024: {
                            slidesPerView: 5,
                            centeredSlides: true,
                        },
                        640: {
                            slidesPerView: 3,
                            centeredSlides: true,
                        },
                        480: {
                            slidesPerView: 2,
                            centeredSlides: true,
                        },
                        320: {
                            slidesPerView: 1,
                            centeredSlides: true,
                        },
                    }}
                    className="swiper-container testimonial-container"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={testimonial.id}>
                            <div
                                className={`flex justify-center px-4 transition-transform duration-300 h-full`}
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
