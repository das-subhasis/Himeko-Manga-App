import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { useStateContext } from '../context/authContext';
import Error from '../components/Error';
const SignIn = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const { register, setError } = useStateContext()

    const [showPassword, setShowPassword] = useState(false)

    const passwordHandler = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const changeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const signHandler = (e) => {
        e.preventDefault()
        if (user.password !== user.confirmPassword) {
            setError('Passwords do not match')
        }
        else {
            register(user)
            setUser({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        }
    }

    

    return (
        <div className='flex-1 flex items-center -mt-10 justify-center w-full h-full font-poppins'>
            <div className='bg-[#151515] max-w-[90%] md:max-w-md p-4 md:p-8 w-full shadow-xl rounded-xl '>
                <h1 className='text-white text-center text-2xl font-semibold'>Register</h1>
                <form className='w-full mt-10' onSubmit={signHandler}>
                    <div className='flex justify-center items-center w-[70%] mx-auto h-10 bg-[#1c1c1c]'>
                        <input type="text" name="firstName" id="first-name" value={user.firstName} placeholder='First Name' className='outline-none w-full h-full bg-inherit text-[#B4B4B8] text-sm px-5 focus-within:ring-2 focus-within:ring-[#FF5F00] rounded-sm' onChange={changeHandler} required />
                    </div>
                    <div className='flex justify-center mt-6 items-center w-[70%] mx-auto h-10 bg-[#1c1c1c]'>
                        <input type="text" name="lastName" id="last-name" value={user.lastName} placeholder='Last Name' className='outline-none w-full h-full bg-inherit text-[#B4B4B8] text-sm px-5 focus-within:ring-2 focus-within:ring-[#FF5F00] rounded-sm' onChange={changeHandler} required />
                    </div>
                    <div className='flex justify-center mt-6 items-center w-[70%] mx-auto h-10 bg-[#1c1c1c]'>
                        <input type="email" name="email" id="user-email" value={user.email} placeholder='Email' className='outline-none w-full h-full bg-inherit text-[#B4B4B8] text-sm px-5 focus-within:ring-2 focus-within:ring-[#FF5F00] rounded-sm' onChange={changeHandler} required />
                    </div>
                    <div className='relative mt-6 flex justify-center items-center w-[70%] mx-auto h-10  bg-[#1c1c1c]'>
                        <input type={showPassword ? `text` : `password`} name='password' id="user-password" value={user.password} placeholder='Password' className='outline-none w-full h-full bg-inherit text-[#B4B4B8] text-sm px-5 pr-10 focus-within:ring-2 focus-within:ring-[#FF5F00] rounded-sm' onChange={changeHandler} required autoComplete='off'/>
                        <button className='absolute right-3' onClick={passwordHandler}>
                            {
                                showPassword ? <IoEyeSharp className='text-[#B4B4B8]' size={20} /> : <IoEyeOffSharp className=' text-[#B4B4B8]' size={20} />
                            }
                        </button>
                    </div>
                    <div className='relative mt-6 flex justify-center items-center w-[70%] mx-auto h-10  bg-[#1c1c1c]'>
                        <input type={showPassword ? `text` : `password`} name='confirmPassword' id="user-confirm" value={user.confirmPassword} placeholder='Confirm Password' className='outline-none w-full h-full bg-inherit text-[#B4B4B8] text-sm px-5 pr-10 focus-within:ring-2 focus-within:ring-[#FF5F00] rounded-sm' onChange={changeHandler} required autoComplete='off'/>
                        <button className='absolute right-3' onClick={passwordHandler}>
                            {
                                showPassword ? <IoEyeSharp className='text-[#B4B4B8]' size={20} /> : <IoEyeOffSharp className=' text-[#B4B4B8]' size={20} />
                            }
                        </button>
                    </div>
                    <Error/>
                    <div className='mt-10 flex justify-center items-center'>
                        <button type='submit' className='bg-[#FF5F00] hover:bg-[#ff5e00dc] h-full px-5 py-1 rounded-md  font-bold'>Register</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignIn