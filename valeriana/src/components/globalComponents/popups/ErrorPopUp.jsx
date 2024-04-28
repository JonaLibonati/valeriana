import React from 'react'
import { PopUpModel } from './PopUpModel'

export const ErrorPopUp = ({ message, setPopUp }) => {
  return (
    <PopUpModel bgColor={'bg-red-500'} borderColor={'border-red-600'} message={message} setPopUp={setPopUp}/>
  )
}
