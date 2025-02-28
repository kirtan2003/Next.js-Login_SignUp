'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';
import Link from 'next/link';
type UserType = {
  email: string;
  username: string;
};
const page = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [id, setId] = useState('');

  const getUserDetail = async() => {
    try {
      const response = await axios.post("/api/users/me");
      const userData: UserType = response.data.data;
      const userId = response.data.data._id;
      setId(userId);
      setUser(userData);
      console.log(userData);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout' );
      console.log(response);
      toast.success("Logged OUT successfully!");
      router.push('/login');
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div className='py-2 flex flex-col justify-center items-center min-h-screen'>
      <Toaster/>
      <h1 className='text-amber-500 text-3xl tracking-wide font-semibold mb-10'>Profile Page: </h1>
      <hr />
      <h2>
        {user===null ? "No User Logged In!!!" : <Link href={`profile/${id}`}>
        Username: {user.username}
        <p>Email: {user.email}</p>
        <p >ID: <span className='text-blue-500'>{id}</span></p>
        </Link>}
      </h2>
      <hr />

      <button className='mt-5 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded' onClick={logout}>
        Logout
      </button>

      <button className='mt-5 py-2 px-4 bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold rounded' onClick={getUserDetail}>
        Get User Detail
      </button>

    </div>
  )
}

export default page