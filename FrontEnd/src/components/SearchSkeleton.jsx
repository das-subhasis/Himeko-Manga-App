import React from 'react'

const SearchSkeleton = () => {
    return (
        <div className='w-full h-10 flex items-center bg-[#1c1c1c] px-2' >
            <p className='whitespace-nowrap overflow-hidden text-ellipsis h-2 w-[75%] bg-[#B4B4B8] rounded-full animate-pulse'/>
            <p className='whitespace-nowrap overflow-hidden text-ellipsis h-2 w-[30%] bg-[#B4B4B8] rounded-full animate-pulse'/>
        </div >
    )
}

export default SearchSkeleton