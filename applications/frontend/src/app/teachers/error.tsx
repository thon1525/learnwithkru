'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
  }, [error])
 
  return (
    <div className='w-full h-[100vh] flex justify-center items-center '>
      <div>
      <h2>{error.message}</h2>
      <button
      className="text-red-600"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      </div>
    </div>
  )
}