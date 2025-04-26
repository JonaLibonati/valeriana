import React from 'react'
import { OutlineButton } from "../globalComponents/buttons/OutlineButton";


export const ConfigAction = ({name, description, buttonText, action}) => {
  return (
    <>
        <p className='mt-4 mb-2'>{name}</p>
        <p className='text-secondary-base text-sm mb-2'>{description}</p>
        <div className='w-fit' onClick={action}>
            <OutlineButton>{buttonText}</OutlineButton>
        </div>
    </>
  )
}
