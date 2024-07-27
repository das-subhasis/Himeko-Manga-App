import { useStateContext } from "../context/authContext"

import React, { useEffect } from 'react'

const Error = () => {
    const { error, setError } = useStateContext()
    useEffect(() => {
        const Timer = setTimeout(() => {
            setError('')
        }, 5000)
        return () => clearTimeout(Timer)
    }, [error])

    return (
        <>
            {
                error && <div className='mt-5 flex justify-center items-center bg-[#FF5F00] rounded-lg py-1' >Error: {error} </div>
            }
        </>


    )
}

export default Error