import React from 'react'
import { useStateContext } from '../context/authContext'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { userState } = useStateContext()
    const navigate = useNavigate()

    if (userState._id) {
        return children
    }

    return <Navigate to={'/login'}/>
}

export default ProtectedRoute