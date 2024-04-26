import React from 'react'

export const LoginOption = ({ optionText, children }) => {
  return (
    <div className="flex flex-wrap justify-center mb-3">
      <p className="text-secondary-base">
        {optionText}
      </p>
      {children}
    </div>
  )
}