import React from 'react'

export const Section = ({ className, bgColor = 'bg-tertiary-light', p = 'p-8', children }) => {
  return (
    <div className={` rounded-md ${bgColor} ${p} ${className}`}>{children}</div>
  )
}
