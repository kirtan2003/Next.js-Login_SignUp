"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { useRouter } from 'next/router';
import Link from 'next/link';

const page = () => {

    // const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUser = async( ) => {
        try {
          await axios.post('/api/users/verifyemail', {token});
          setVerified(true);
          setError(false);
        } catch (error: any) {
          setError(true);
          console.log(error.message);
          console.log(error);
        }
    }

    useEffect(() => {
      // const {query} = router;
      // const tokenFromQuery = query.token

      setError(false);
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromURL = urlParams.get("token");
      if (tokenFromURL) {
        setToken(tokenFromURL);
      }
    }, []);
    useEffect(() => {
      setError(false);
      if (token) {
        verifyUser();
      }
    }, [token]);
        
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl mb-5'>Verify Email</h1>
      <h3 className='p-2 bg-amber-500 text-black'>{token ? `${token}` : 'No Token!'}</h3>
      {
        verified && (
          <>
          <div className='bg-green-500 p-2 text-3xl text-black'>
            <h2>Account Verified!</h2>
          </div>
          <Link href={'/login'}>Login</Link>
          </>
        )
      }
      {
        error && (
          <div className='bg-red-700 p-2 mt-5 text-black text-3xl rounded'>
            <h2>Verification Failed!</h2>
          </div>
        )
      }
    </div>
  )
}

export default page