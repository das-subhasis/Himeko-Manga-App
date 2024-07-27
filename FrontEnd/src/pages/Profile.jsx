import React from 'react'
import { useStateContext } from '../context/authContext'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { userState } = useStateContext()
    return (
        <>
            <div className='flex-1 px-20 font-poppins mb-10'>
                <div className='mt-10'>
                    <h1 className='text-2xl text-white text-center'>It's great to have you back {userState.firstName}     </h1>
                </div>
                <div className=' mt-10 flex flex-col max-w-screen-md mx-auto gap-4 shadow-lg'>
                    <div className='h-16 bg-[#191919] max-w-screen-md mx-auto w-full rounded-t-2xl grid grid-cols-6 overflow-hidden text-white'>
                        <div className='col-span-1 flex items-center justify-center '>
                            <h1 className='text-lg'>#</h1>
                        </div>
                        <div className='col-span-4 flex items-center justify-center '>
                            <h1 className='text-lg'>Title</h1>
                        </div>
                        <div className='col-span-1 flex items-center justify-center mr-5'>
                            <h1 className='text-lg'>Read At</h1>
                        </div>
                    </div>
                    {
                        userState.readHistory ? userState.readHistory.map((manga, index) => {
                            return (
                                (
                                    <div className='h-16 bg-[#191919] max-w-screen-md mx-auto w-full grid grid-cols-6 overflow-hidden text-white'>
                                        <div className='col-span-1 flex items-center justify-center '>
                                            <h1 className='text-lg'>{index + 1}</h1>
                                        </div>
                                        <div className='col-span-4 flex items-center justify-center '>
                                            <h1 className='text-lg'><Link to={`https://mangadex.org/title/${manga.id}`}>{manga.title}</Link></h1>
                                        </div>
                                        <div className='col-span-1 flex items-center justify-center mr-5'>
                                            <h1 className='text-lg w-full whitespace-nowrap overflow-hidden text-ellipsis'>{Date(manga.readAt).split(" ").splice(1,3).join(" ")}</h1>
                                        </div>
                                    </div>
                                )
                            )
                        }): <div className='text-white text-lg'>Nothing to show</div>
                    }
                </div>

            </div>
        </>
    )
}

export default Profile