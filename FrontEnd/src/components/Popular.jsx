import React, { useEffect, useState } from 'react'
import { getMangaByTagID, getMangaByRating, searchManga } from '../api/mangadex.api'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'

const Popular = () => {

    const [manga, setManga] = useState([])

    useEffect(() => {
        const data = async () => {
            const popularManga = await getMangaByRating('desc', 'desc')
            setManga(popularManga)
        }
        data()
    }, [])

    return (
        <div className='container mx-auto'>
            <div className='w-full mt-10 mb-5 px-5 md:px-20 font-poppins text-white'>
                <div className='h-full '>
                    <h1 className='text-3xl font-medium mb-5'>Popular</h1>
                    <Swiper
                        slidesPerView={'auto'}
                        loop={true}
                        className=' w-full rounded-xl'>
                        {
                            manga && manga.map(manga => {
                                return (
                                    <SwiperSlide
                                        key={manga.mangaId}
                                        className='h-full w-[128px] md:w-[256px] mr-6 '>
                                        <div className='flex flex-col h-[calc(100%-1.75rem)] '>
                                            <div className='w-full h-full overflow-hidden '>
                                                <Link
                                                    to={`/manga/${manga.title}`}
                                                >
                                                    <img src={`https://uploads.mangadex.org/covers/${manga.mangaId}/${manga.coverArtUrl}`} alt=""
                                                        className='object-cover w-full h-full  aspect-[5/7] select-none rounded-lg' />
                                                </Link>
                                            </div>
                                            <div className='text-black flex items-center py-2 w-full text-sm'>
                                                <Link className='text-sm line-clamp-1 text-white'>{manga.title}</Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Popular