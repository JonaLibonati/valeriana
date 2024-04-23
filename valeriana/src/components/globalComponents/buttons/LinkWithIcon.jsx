import React from 'react'
import { Link } from 'react-router-dom'

export const LinkWithIcon = ({text, className, to, children}) => {
  return (
    <Link className={`flex ${className}`} to={to}>
        { children }
        <p className='pt-[1px] inline'>{text}</p>
    </Link>
  )
}
