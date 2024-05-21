import React from 'react'
import { useAuthContext } from '../context/authContext'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { userState } = useAuthContext()
    const navigate = useNavigate()

    if (userState._id) {
        return children
    }

    return <Navigate to={'/login'}/>
}

export default ProtectedRoute