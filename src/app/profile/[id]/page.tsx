'use client'
import React from 'react'

const page = ({params}: any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-teal-400 text-3xl tracking-wide font-semibold mb-10'>Profile Page: </h1>
        <h3 className='p-3 bg-teal-500 rounded text-black'>{params.id}</h3>
    </div>
  )
}

export default page