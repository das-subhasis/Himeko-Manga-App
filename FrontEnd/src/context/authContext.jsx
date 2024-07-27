import { createContext, useContext, useEffect, useReducer, useState } from "react";
import authReducer from "../reducer/authReducer";
import client from "../config/config";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const authContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const initialAuthState = JSON.parse(localStorage.getItem("userState")) || {
        _id: null,
        firstName: null,
        lastName: null,
        email: null,
        readHistory: [],
        token: null
    };
    const [error, setError] = useState('');
    const [userState, authDispatch] = useReducer(authReducer, initialAuthState);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const location = useLocation()




    useEffect(() => {
        localStorage.setItem("userState", JSON.stringify(userState));
    }, [userState]);



    const login = async ({ email, password }) => {
        try {
            const response = await client.post('/user/login', { email, password })
            console.log(response.data)
            if (response.status === 200 || response.status === 201) {
                authDispatch({
                    type: "HANDLE_USER",
                    payload: { user: response.data.user, token: response.data.token }
                })
                navigate(-1)
            }
        } catch (error) {
            console.error("Oops", error.response.data.message);
            setError(error.response.data.message)
        }
    };

    const register = async ({ firstName, lastName, email, password }) => {
        try {
            const response = await client.post('/user/signin', { firstName, lastName, email, password })
            if (response.status === 200 || response.status === 201) {
                authDispatch({
                    type: "HANDLE_USER",
                    payload: { user: response.data, token: response.data.token }
                })
                navigate('/')
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    };

    const logout = () => {
        authDispatch({
            type: "HANDLE_USER",
            payload: {
                user: {
                    _id: null,
                    firstName: null,
                    lastName: null,
                    email: null,
                    readHistory: [],
                    token: null
                }
            }
        })
        localStorage.clear()
        navigate('/')
    };

    return (
        <authContext.Provider value={{ userState, login, register, logout, error, setError, authDispatch, loading, setLoading }}>
            {children}
        </authContext.Provider>
    )
}

export const useStateContext = () => useContext(authContext)