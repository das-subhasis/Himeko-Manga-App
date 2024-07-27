import React, { useEffect } from 'react'
import Slider from '../components/Slider'
import { searchManga } from '../api/mangadex.api'
import Romance from '../components/Romance'
import { useStateContext } from '../context/authContext'
import Popular from '../components/Popular'
import Horror from '../components/MangaSlider'
import MangaSlider from '../components/MangaSlider'



const Homepage = () => {
    return (
        <div className='min-h-[500px]'>
            <Slider />
            <section className='mt-10'>
                <MangaSlider category={'Romance'} />
                <MangaSlider category={'Isekai'} />
                <MangaSlider category={'Horror'} />
            </section>
        </div>
    )
}

export default Homepage