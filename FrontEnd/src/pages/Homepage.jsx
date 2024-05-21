import React, { useEffect } from 'react'
import Slider from '../components/Slider'
import { searchManga } from '../api/mangadex.api'
import Romance from '../components/Romance'
import { useAuthContext } from '../context/authContext'
import Popular from '../components/Popular'



const Homepage = () => {
    const { userState } = useAuthContext()
    console.log(localStorage)

    useEffect(() => {
        searchManga()
    })
    return (
        <div className='min-h-[500px]'>
            <Slider />
            <section>
                <Popular />
                <Romance />
            </section>
        </div>
    )
}

export default Homepage