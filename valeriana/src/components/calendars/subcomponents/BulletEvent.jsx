import React from 'react'

export const BulletEvent = ({ text }) => {
  return (
    <>
        <div className='pt-1 pb-1 text-sm flex align-middle'>
            <div className='bg-primary-base rounded-full size-3 self-center'></div>
            <p className='pl-1'>{text}</p>
        </div>
    </>
    
  )
}
