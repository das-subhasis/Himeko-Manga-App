
import React, { useContext, useEffect, useState } from 'react'
import { getMangaByTagID, getMangaByRating, searchManga } from '../api/mangadex.api'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import client from '../config/config'
import { useStateContext } from '../context/authContext'
import MangaSkeleton from './MangaSkeleton'

const MangaSlider = ({ category }) => {

    const [manga, setManga] = useState([])
    const { loading, setLoading } = useStateContext()

    useEffect(() => {
        const data = async () => {
            setLoading(true)
            const response = await client.get(`manga/getMangaByTagID?include=${category}&exclude=Boys' Love`);
            if (response.status === 200) {
                setManga(response.data);
                setLoading(false)
            }

        }
        data()
    }, [])

    return (
        <div className='container mx-auto'>
            <div className='w-full  mb-5 px-5 md:px-20 font-poppins text-white'>
                <div className='h-full '>
                    <h1 className='text-3xl font-medium mb-5'>{category}</h1>
                    <Swiper
                        slidesPerView={'auto'}
                        loop={true}
                        className=' w-full rounded-xl flex'>
                        {
                            loading ?
                                (
                                    <MangaSkeleton/>
                                )
                                : (manga.map(manga => {
                                    return (
                                        <SwiperSlide
                                            key={manga.mangaId}
                                            className='h-full w-[128px] md:w-[200px] mr-6 '>
                                            <div className='flex flex-col h-[calc(100%-1.75rem)] '>
                                                <div className='w-full h-full overflow-hidden '>
                                                    <Link>
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
                                }))
                        }

                    </Swiper>

                </div>
            </div >
        </div >

    )
}

export default MangaSlider