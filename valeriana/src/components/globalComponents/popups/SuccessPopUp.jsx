import React from 'react'
import { PopUpModel } from './PopUpModel'

export const SuccessPopUp = ({ message, setPopUp }) => {
  return (
    <PopUpModel bgColor={'bg-green-500'} borderColor={'border-green-600'} message={message} setPopUp={setPopUp}/>
  )
}