import React, { useCallback, useEffect, useRef, useState } from 'react'
import { light_yg } from '../assets/images/images'
import { Link } from 'react-router-dom'
import { FaBars, FaSearch } from 'react-icons/fa'
import { useStateContext } from '../context/authContext'
import { searchManga } from '../api/mangadex.api'
import { IoCloseCircle } from "react-icons/io5";
import useComponentVisible from '../Hooks/useComponentVisible'
import SearchSkeleton from './SearchSkeleton'
import client from '../config/config'


const Header = ({ toggle, setToggle }) => {
    const resultRef = useRef(null)
    const { logout, userState, authDispatch, setSelectedManga } = useStateContext()
    const { ref, isVisible, setIsVisible } = useComponentVisible(false, resultRef)
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const searchHandler = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const updateHistory = (manga) => {
        if (userState?.token) {
            authDispatch({
                type: "HANDLE_READ",
                payload: {
                    readHistory: {
                        title: manga.title,
                        id: manga.mangaId,
                        readAt: Date.now()
                    }
                }
            })
        }
    }

    const flushSearchQuery = (e) => {
        setSearchQuery("")
    }

    useEffect(() => {
        setisLoading(true)
        const debounceTimeout = setTimeout(async () => {
            if (searchQuery.trim() !== '') {
                setIsVisible(true);
                try {
                    const response = await client.get('/manga/searchManga', { params: { title: searchQuery, limit: 5 } })
                    setSearchResult(response.data);
                } catch (e) {
                    console.error(e);
                } finally {
                    setisLoading(false);
                }
            } else {
                setSearchResult([]);
            }
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);

    useEffect(() => {
        if (!isVisible) {
            flushSearchQuery();
        }
    }, [isVisible, flushSearchQuery]);

    console.log(searchResult)

    return (
        <div className='w-full font-poppins text-white z-10 px-5 md:px-20'>
            <div className='container h-[100px] mx-auto flex items-center flex-wrap my-2'>
                <div className='flex-1 text-2xl flex items-center justify-center sm:justify-normal gap-5'>
                    <Link to={'/'}> <div className='flex items-center gap-5'>
                        <img
                            src={light_yg}
                            alt="logo"
                            className='w-10' />
                        <span className='hidden sm:block'><p className='font-poppins font-bold '>Himeko</p></span>
                    </div>
                    </Link>
                </div>
                <div className='flex items-center gap-5 text-md font-bold '>
                    <div
                        className='relative flex items-center text-sm '
                    >
                        <input
                            type="text"
                            id="search"
                            value={searchQuery} className={`md:relative w-[100px] sm:w-[180px] md:w-[400px]
                            transition-all duration-200 ease-in-out bg-inherit focus-within:bg-[#151515] h-8 outline-none focus:ring-2 focus:ring-[#FF5F00] focus-within:pl-3 pr-8 rounded-md text-[#B4B4B8]`}
                            ref={ref}
                            placeholder='Search for manga'
                            autoComplete='off'
                            onFocus={() => setIsVisible(true)}
                            onChange={searchHandler}
                        />
                        <button
                            className='absolute right-2'
                        >
                            {
                                searchQuery ? <IoCloseCircle size={20} onClick={() => setSearchQuery("")} /> : <FaSearch className='' size={15} />
                            }
                        </button>
                        {
                            searchQuery.trim() !== "" && <div
                                ref={ref}
                                className='md:w-[400px] w-[300px] absolute bg-[#151515] h-fit top-10 rounded-sm py-2 px-2'>
                                <div
                                    className='flex flex-col gap-3'>

                                    {
                                        isLoading ?
                                            <SearchSkeleton /> :
                                            searchResult.map(manga => {
                                                return <Link
                                                    key={manga.mangaId}
                                                    to={`/manga/${manga.mangaId}`}
                                                    onClick={() => {
                                                        updateHistory(manga);
                                                        setSelectedManga(manga);
                                                    }}

                                                ><div
                                                    className='w-full h-10 flex items-center text-white bg-[#1c1c1c] px-2'>
                                                        <p className='whitespace-nowrap overflow-hidden text-ellipsis
                                                p-2 rounded-sm'>{manga.title}</p>
                                                    </div>
                                                </Link>
                                            })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className='md:block md:px-5 py-1'><Link to={'/'}>Home</Link></div>
                    <div className='md:block md:px-5 py-1'><Link to={'/profile'}>Profile</Link></div>
                    {
                        userState._id ? (<>
                            <button onClick={logout}>
                                <div
                                    className='ml-3 px-3 py-2.5 bg-[#FF5F00] text-black rounded-full font-extrabold'>
                                    {userState.firstName[0] + userState.lastName[0]}</div></button>
                        </>) : <Link to={'/login'}><div className='px-5 py-1.5 bg-[#FF5F00] text-black rounded-md font-extrabold hidden md:block'>Login</div></Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header