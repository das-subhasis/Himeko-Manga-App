import React, { useEffect, useState } from 'react'
import { fairy } from '../assets/images/images'
import { Link, useParams } from 'react-router-dom'
import { useStateContext } from '../context/authContext';
import client from '../config/config';
import { formatDate } from '../utils/utils';
const Manga = () => {

    const { id } = useParams();
    const { loading, setLoading, selectedManga } = useStateContext();
    const [chapterList, setChapterList] = useState([]);

    useEffect(() => {
        setLoading(true);
        const getChapters = async () => {
            const { data } = await client.get(`/manga/chapter/${id}/feed`);
            setChapterList(data);
            setLoading(false);
        }
        getChapters();
    }, [id])
    
    return (
    <div className='flex-1 text-white py-2.5 md:px-20 h-full flex flex-col font-poppins'>
            <div className='px-5 h-[350px] max-w-screen-lg mx-auto w-full flex items-center gap-5 md:gap-0'>
                <div className='w-[40%] md:w-[30%] flex justify-center'>
                    <img src={`https://himeko-manga-app.vercel.app/api/manga/manga-cover/${selectedManga.mangaId}/${selectedManga.coverArtUrl}`} alt="" className='h-full w-[200px] aspect-[5/7] rounded-xl' />
                </div>
                <div className='flex-1 h-full py-12'>
                    <div className='flex flex-col gap-4 h-full w-full justify-center '>
                        <div className='w-full '>
                            <h1 className='text-2xl md:text-3xl font-medium line-clamp-2'>{selectedManga.title || 'Chapter Title Not Available'}</h1>
                        </div>
                        <div className='line-clamp-4 text-sm'>
                            <p>{selectedManga.description}</p>
                        </div>
                        <div className='h-16 flex items-center w-fit text-sm'>
                            <Link to={`https://mangadex.org/chapter/${chapterList[chapterList.length-1]?.id}`} className='bg-orange-600 hover:bg-orange-600/90 px-3 font-semibold py-2 rounded-md text-black'>Read Latest Chapter</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-screen-lg mx-auto  w-full flex flex-col items-center flex-1  p-5'>
                <div className='flex-1 flex flex-col bg-[#191919] h-full w-full overflow-hidden'>
                    {chapterList.map(chapter => {
                        return (
                            <div key={chapter.id} className='w-full h-20 hover border flex items-center'>
                                <p className='w-[10%] text-center'>{chapter.chapter}</p>
                                <Link to={`https://mangadex.org/chapter/${chapter.id}`} className='flex-1'><p className='hover:text-orange-600'>{chapter.title ? chapter.title : `Chapter ${chapter.chapter}`}</p></Link>
                                <p className='w-[30%] md:w-[20%] text-center'>{formatDate(chapter.publishAt)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Manga