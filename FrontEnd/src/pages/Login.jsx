import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { useAuthContext } from '../context/authContext';
import Error from '../components/Error';

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" })
    const [isvisible, setVisible] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const passwordHandler = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const loginHandler = (e) => {
        e.preventDefault()
        login({ email: user.email, password: user.password })
        setUser({ email: "", password: "" })
    }

    const changeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const { login, error, setError } = useAuthContext()


    return (
        <div className='flex-1 flex items-center -mt-10 justify-center w-full h-full font-poppins'>
            <div className='bg-[#151515] max-w-[90%] md:max-w-md p-4 md:p-8 w-full shadow-xl rounded-xl '>
                <h1 className='text-white text-center text-2xl font-semibold'>Login</h1>
                <form action="#" className='w-full mt-10'>
                    <div className='flex justify-center items-center w-[70%] mx-auto h-10 bg-[#1c1c1c]'>
                        <input type="email" name="email" id="user-email" value={user.email} placeholder='Email' className='outline-none w-full h-full bg-inherit text-[#B4B4B8] text-sm px-5 focus-within:ring-2 focus-within:ring-[#FF5F00] rounded-sm' onChange={changeHandler} />
                    </div>
                    <div className='relative mt-6 flex justify-center items-center w-[70%] mx-auto h-10  bg-[#1c1c1c]'>
                        <input type={showPassword ? `text` : `password`} name='password' id="user-password" value={user.password} placeholder='Password' className='outline-none w-full h-full bg-inherit text-[#B4B4B8] text-sm px-5 pr-10 focus-within:ring-2 focus-within:ring-[#FF5F00] rounded-sm' onChange={changeHandler} autoComplete='off'/>
                        <button className='absolute right-3' onClick={passwordHandler}>
                            {
                                showPassword ? <IoEyeSharp className='text-[#B4B4B8]' size={20} /> : <IoEyeOffSharp className=' text-[#B4B4B8]' size={20} />
                            }
                        </button>
                    </div>
                    <div className='mt-10 flex justify-center items-center'>
                        <button className='bg-[#FF5F00] hover:bg-[#ff5e00dc] h-full px-5 py-1 rounded-md  font-bold' onClick={loginHandler}>Submit</button>
                    </div>
                    <Error/>
                </form>
                <div className='w-full mt-8 flex items-center justify-center'>
                    <span className='text-[#FF5F00] font-semibold'><Link to={'/signin'}>
                        New User? Register Now!!
                    </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login