import React, { useEffect, useRef, useState } from 'react'

const useComponentVisible = (initialIsVisible) => {
    const [isVisible, setIsVisible] = useState(initialIsVisible)
    const ref = useRef(null)

    const handleClickOutside = (event) => {
        if (ref.current && !(ref.current.contains(event.target))) {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    })

    return { ref, isVisible, setIsVisible }
}

export default useComponentVisible