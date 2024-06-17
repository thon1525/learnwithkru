"use client"
import SignupToBecomeStudent from '@/components/organisms/auth/StudentForm'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        <SignupToBecomeStudent/>
    </div>
  )
}

export default page