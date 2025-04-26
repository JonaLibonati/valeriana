import React from 'react'

export const OutlineButton = ({children, className}) => {
  return (
    <div className={`grid content-center w-full p-4 pt-1 pb-1 mt-1 mb-1 rounded-md text-tertiary-dark outline outline-primary-base focus-visible:outline-0 cursor-pointer ${className}`}>
      {children}
    </div>
  )
}
