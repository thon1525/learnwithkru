"use client"
import React from 'react'
import Image from 'next/image'
import { Button, Typography } from '@/components'
const Banner = () => {

  return (
     <div className='w-full h-[400px] flex justify-between items-center border-2 border-[#7B2CBF]'>
          {/* Image */}
          <div className='w-1/2 h-full flex items-center justify-center'>
              <Image
              className='h-[99%]'
              src={"/Benner/Benner-bottom.jpg"}
              width={730.18}
              height={400}
              alt='Benner image'
              >

              </Image>
          </div>
          {/* Heading */}

          <div className='w-1/2 h-full flex justify-center items-center'>
             <div className='w-1/2 h-1/2'>
              <Typography
              align='left'
              fontSize='lg'
              variant="semibold"
              className=''
              >
              Graduated or Want Internship ? Submit now , Show Your Skill
              </Typography>

              <Button
               fontSize='md'
               colorScheme='primary'
               className='mt-6 w-[240px] h-[45px] flex justify-evenly px-2 items-center'
               radius='md'
               
              >Become a teacher now
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>

              </Button>
            </div>
          </div>
     </div>
  )
}
export { Banner }