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
        <div className='flex-1 text-white py-2.5 px-20 h-full flex flex-col font-poppins'>
            <div className='h-[350px]   max-w-screen-lg mx-auto  w-full flex items-center'>
                <div className='w-[30%] flex justify-center'>
                    <img src={`https://himeko-manga-app.vercel.app/api/manga/manga-cover/${selectedManga.mangaId}/${selectedManga.coverArtUrl}`} alt="" className='h-full w-[200px] aspect-[5/7] rounded-xl' />
                </div>
                <div className='flex-1 h-full py-12 pr-10'>
                    <div className='flex flex-col gap-4 h-full w-full px-3'>
                        <div className=''>
                            <h1 className='text-3xl font-medium line-clamp-2'>{selectedManga.title || 'Chapter Title Not Available'}</h1>
                        </div>
                        <div className='line-clamp-4'>
                            <p>{selectedManga.description}</p>
                        </div>
                        <div className='h-16 flex items-center w-fit '>
                            <Link to={`https://mangadex.org/chapter/${chapterList[chapterList.length-1]?.id}`} className='bg-orange-600 hover:bg-orange-600/90 px-3 font-semibold py-2 rounded-md text-black'>Read Latest Chapter</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-screen-lg mx-auto  w-full flex flex-col items-center flex-1  p-5'>
                <div className='flex-1 flex flex-col bg-[#191919] h-full w-full overflow-hidden'>
                    {chapterList.map(chapter => {
                        return (
                            <div key={chapter.id} className='w-full h-20 bg-white/5 hover:bg-white/10 border flex items-center'>
                                <p className='w-[10%] text-center'>{chapter.chapter}</p>
                                <Link to={`https://mangadex.org/chapter/${chapter.id}`} className='flex-1'><p className='hover:text-orange-600'>{chapter.title ? chapter.title : `Chapter ${chapter.chapter}`}</p></Link>
                                <p className='w-[20%] text-center'>{formatDate(chapter.publishAt)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Manga