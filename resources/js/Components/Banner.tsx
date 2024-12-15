import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

interface Banner {
    videoUrl: string;
    title: string;
}

const VideoCarousel = ({ banners }: { banners: Banner[] }) => {
    return (
        <div className="relative w-full h-[500px] swiper-container-curve">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                spaceBetween={30}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop
                style={{ height: "100%" }}
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index} className="relative flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <video
                                src={banner.videoUrl}
                                muted
                                autoPlay
                                loop
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute bottom-10 right-14 z-20 flex flex-col gap-4">
                <div className="swiper-button-prev text-white  bg-opacity-60 p-4 rounded-full cursor-pointer hover:bg-opacity-80 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z" />
                    </svg>
                </div>
                <div className="swiper-button-next text-white bg-opacity-60 p-4 rounded-full cursor-pointer hover:bg-opacity-80 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM11.289,4.3,12.711,5.7l-4.3,4.344L12.7,14.289,11.3,15.711,5.586,10.063Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default VideoCarousel;
