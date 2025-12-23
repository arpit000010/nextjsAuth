'use client'  // telling that this page is fronted page so now i can use all frontend stuff in it easily
import Link from 'next/link'
import React, { useEffect } from 'react'
import {useRouter} from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'




export default function LoginPage(){
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        
        try{

            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log('Login success', response.data)
            toast.success("login success")
            router.push('/profile')

        } catch(error: any){
            console.log("Cannot login", error.message)
            toast.error(error.message)

        } finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0)
            setButtonDisabled(false)
        else
            setButtonDisabled(true)

    }, [user])


    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? 'Processing' : "Login"}</h1>
            <hr />

            <label htmlFor="email">email</label>
            <input 
            className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            type="text" 
            id='email' 
            value={user.email}
            onChange={(e)=>setUser({...user, email: e.target.value})}
            placeholder='email'
            />

            <label htmlFor="password">password</label>
            <input 
            className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            type="text" 
            id='password' 
            value={user.password}
            onChange={(e)=>setUser({...user, password: e.target.value})}
            placeholder='password'
            />

            <button
            onClick={onLogin}
            className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
            >{buttonDisabled ? 'Cannot signin' : 'sign-in'}</button>

            <Link href='/signup'>Visit Signup Page</Link>

        </div>
    )
}