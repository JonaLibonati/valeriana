import React from 'react'

export const Day = ({ text }) => {

  return (
    <div className={`size-9 flex justify-items-center items-center`}>
        <p className='w-full text-center align-middle'>{text}</p>
    </div>
  )
}
