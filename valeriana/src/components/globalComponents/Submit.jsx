import React from 'react'

export const Submit = ({ text }) => {
  return (
    <input
      className='w-full p-4 pt-1 pb-1 mt-3 mb-1 rounded-md text-white bg-rose-300 focus-visible:outline-0 sm:text-lg cursor-pointer'
      value = { text }
      type="submit"
    />
  )
}
