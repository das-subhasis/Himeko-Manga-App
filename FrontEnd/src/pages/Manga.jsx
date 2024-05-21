import React from 'react'
import { fairy } from '../assets/images/images'
import { Link } from 'react-router-dom'
const Manga = () => {
    return (
        <div className='flex-1 text-white py-2.5 px-20 h-full flex flex-col font-poppins'>
            <div className='h-[350px]   max-w-screen-lg mx-auto  w-full flex items-center'>
                <div className='w-[30%] flex justify-center'>
                    <Link className=''>
                        <img src={fairy} alt="" className='h-full w-[200px] aspect-[5/7]' />
                    </Link>
                </div>
                <div className='flex-1 h-full py-8 pr-10'>
                    <div className='flex flex-col gap-10 h-full w-full px-3'>
                        <div className=''>
                            <h1 className='text-3xl font-medium'>Fairy Tail</h1>
                        </div>
                        <div className='flex-1'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur architecto esse commodi beatae, inventore repellat dicta et, laboriosam eaque atque aperiam! Fugit tempora aperiam ipsa fuga minima nihil quos numquam nostrum consequuntur.</p>
                        </div>
                        <div className='h-16 flex items-center  w-fit '>
                            <button className='bg-orange-600 px-3 font-semibold py-2 rounded-md text-black'>Read Latest Chapter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-screen-lg mx-auto  w-full flex flex-col items-center flex-1  p-5'>
                <div className='flex-1 bg-white h-full w-full'>
                    

                </div>
            </div>
        </div>
    )
}

export default Manga