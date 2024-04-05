import React from 'react'

export const Submit = ({ text }) => {
  return (
    <input
      className='p-4 pt-1 pb-1 mt-1 mb-1 border-2 rounded-md bg-white has-[:focus-visible]:border-[#DB8638] focus-visible:outline-0 sm:text-xl'
      value = { text }
      type="submit"
    />
  )
}
