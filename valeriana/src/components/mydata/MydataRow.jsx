import React from 'react';

export const MydataRow = ({ labelText, children }) => {
  return (
    <>
      <div className="inline text-secondary-base border-r-2 border-secondary-base">{labelText}</div>
      <div className="inline relative ml-2">
        {children}
      </div>
    </>
  )
}
