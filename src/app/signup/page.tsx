'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster }  from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user)
      console.log("Sign up success", res);
      toast.success("Signed Up Successfully!");
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Sign Up failed");
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (user.password.length > 0 && user.username.length > 0 && user.email.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      
      <h1 className={`mb-10 ${loading ? "text-2xl text-amber-500" : "text-4xl"}`}>{loading ? "Processing..." : "Sign Up"}</h1>
      <label htmlFor="username">username</label>
      <input
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
        className='p-2 border border-gray-300 rounded-lg mt-2 mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="text"
      />

      <label htmlFor="email">email</label>
      <input
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
        className='p-2 border border-gray-300 rounded-lg mt-2 mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="email"
      />

      <label htmlFor="password">password</label>
      <input
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
        className='p-2 border border-gray-300 rounded-lg mt-2 mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="password"
      />

      <button onClick={handleClick} className='p-2 bg-amber-500  rounded-lg my-4 text-sm focus:outline-none focus:border-gray-600'>
        {/* {loading && disabled ? (
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4
          rounded-full text-gray-500"  role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <span className="text-white">Sign Up</span>
        )
        } */}
        {disabled? "All fields are required": "Sign Up"}
      </button>

      <Link href={'/login'}>Already have an Account? <span className='text-sky-600'>click here</span> to login</Link>
      <Toaster/>
    </div>
  )
}

export default page
