import React from 'react'

export const ConfigElement = ({children, name}) => {
  return (
    <div className="mb-2 grid items-center grid-cols-[200px_1fr] gap-6 rounded-md bg-tertiary-light">
        <div className="self-start inline pr-1 text-secondary-base border-r-2 border-secondary-base h-full">
            {name}
        </div>
        {children}
    </div>
  )
}
