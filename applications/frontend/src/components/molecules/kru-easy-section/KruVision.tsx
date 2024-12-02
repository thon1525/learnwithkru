import { Typography } from '@/components/atoms'
import React from 'react'

const KruVision = () => {
  return (
    <div className='w-full h-[100px] md:h-[128px] bg-[#F6FAFC] flex justify-center items-center shadow-sm'>
      <div className='w-[80%] h-1/2'>
        <Typography
          className='tracking-wider capitalize'
          fontSize='lg'
          variant='2-extrabold'
        >Kru platform is <span className='text-[#7B2CBF]'>easy</span></Typography>
        <Typography
          className='text-xs'
          fontSize='sm'
          variant='normal'
        >once you login,you’ll know what to do</Typography>
      </div>
    </div>
  )
}

export { KruVision }