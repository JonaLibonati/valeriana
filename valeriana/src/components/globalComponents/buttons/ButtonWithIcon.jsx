import React from 'react'

export const ButtonWithIcon = ({text, className, onClick, children}) => {
  return (
    <button className={`flex ${className}`} onClick={() => onClick()}>
        { children }
        <p className='pt-[1px] inline'>{text}</p>
    </button>
  )
}
