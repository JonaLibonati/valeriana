import React from 'react'

export const MydataModule = ({ handleSubmit, children }) => {

  return (
    <form onSubmit={handleSubmit} style={{transition:'height 1s'}} className="grid grid-cols-[200px_1fr] p-8 gap-6 rounded-md bg-tertiary-light ">
      {children}
    </form>
  )
}
