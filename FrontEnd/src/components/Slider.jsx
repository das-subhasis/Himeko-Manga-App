import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import sliderImages from '../utils/sliderImages'
import 'swiper/css'
import { Link } from 'react-router-dom'


const Slider = () => {

    return (
        <div className='w-full h-full px-5 md:px-20 -z-10 font-amaranth'>
            <div className='container mx-auto'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true
                    }}
                    loop={true}
                    className='bg-black rounded-3xl h-[400px] overflow-hidden ' >
                    {
                        sliderImages && sliderImages.map((slides, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link
                                        className='relative flex h-[400px] w-full' to={'/abc'}>
                                        <img src={slides.url} alt="" className='absolute w-full h-[150%] top-0 object-cover' />
                                        <div className='w-full h-full bg-gradient-to-b from-[#1c1c1c]/60 to-[#1c1c1c] absolute top-0' />
                                        <div className='flex items-center gap-4 md:h-[70%] h-1/2 w-full mt-auto px-2 md:px-4 py-4'>
                                            <div className='z-20 aspect-[5/7] h-full  overflow-hidden rounded-md shadow'>
                                                <img src={slides.url} alt="" className='object-fill w-full h-full' />
                                            </div>
                                            <div className='z-20 flex flex-col h-full w-full flex-1 '>
                                                <div className='flex-1 flex flex-col md:gap-5 mb-5 sm:mb-2 text-white justify-end'>
                                                    <h1 className='text-3xl font-amaranth font-bold'>{slides.title}</h1>
                                                    <p className='hidden sm:block line-clamp-1 text-sm md:text-base'>{slides.desc}</p>
                                                </div>
                                                <div className='items-center mt-auto flex justify-start gap-5 '>
                                                    <span className='flex items-center bg-[#FF5F00] gap-2 px-3 py-2 rounded-lg'>Read Now</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div>
        </div>
    )
}


export default Slider