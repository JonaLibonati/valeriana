import React, { useEffect, useRef, useState } from 'react'
import { EditIcon } from '../globalComponents/icons/EditIcon'

export const EditInput = ({ value, setValue, type, maxLength }) => {

  const input = useRef(null);

  return (
    <div className='grid grid-cols-[1fr_fit-content(0)] gap-4'>
      <input
        ref={input}
        type={type}
        maxLength={maxLength}
        className='pl-1 bg-tertiary-light text-primary-dark border-b-2 border-tertiary-light focus-visible:outline-0 focus-visible:border-primary-base focus-visible:bg-primary-light'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className='cursor-pointer' onClick={() => input.current.focus()}>
        <EditIcon className={'text-secondary-base size-6'} />
      </div>
    </div>
  )
}
