import React from 'react'
import { XIcon } from '../icons/XIcon'

export const PopUpModel = ({ bgColor, borderColor, message, setPopUp }) => {
  return (
    <div className='w-vw sticky top-6 h-0 ml-4 mr-4 z-[9999]'>
      <div className={`right-0 left-0 m-auto grid grid-cols-[1fr_fit-content(0)] max-w-[600px] items-center ${bgColor} p-3 border-2 ${borderColor} text-white rounded-md`}>
        <p>{message}</p>
        <button onClick={() => setPopUp(false)}>
          <XIcon className={'size-7'} />
        </button>
      </div>
    </div>
  )
}