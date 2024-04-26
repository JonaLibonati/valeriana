import React from 'react'
import { XIcon } from '../icons/XIcon'

export const ErrorPopUp = ({ errorMessage, setErrorPopUp }) => {
  return (
    <div className='absolute z-[9999] mt-6 right-0 left-0 m-auto w-dvw grid grid-cols-[1fr_fit-content(0)] max-w-[600px] items-center bg-red-500 p-3 border-2 border-red-600 text-white rounded-md'>
      <p>{errorMessage}</p>
      <button onClick={() => setErrorPopUp(false)}>
        <XIcon className={'size-7'}/>
      </button>
    </div>
  )
}
