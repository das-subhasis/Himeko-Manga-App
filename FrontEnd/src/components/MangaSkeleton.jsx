// MangaSkeleton.js
import React from 'react';
import { SwiperSlide } from 'swiper/react';

const MangaSkeleton = () => {
    return (
        <>
            {Array.from({ length: 10 }).map((_, idx) => {
                return (
                    <SwiperSlide
                        key={idx}
                        className='h-full w-[128px] md:w-[200px] mr-6 bg-[#B4B4B8] animate-pulse'>
                        <div className='flex flex-col h-[calc(100%-1.75rem)] bg-[#B4B4B8] animate-pulse'>
                            <div className='w-full h-full overflow-hidden aspect-[5/7]'>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </>
    );
};

export default MangaSkeleton;
