import React, { useContext } from 'react'
import { NewPasswordHelpers } from "../../helpers/newPasswordHelpers";
import { LoginOption } from './LoginOption'
import { PopUpContext } from '../../contexts/PopUpContext';

export const NewPassOption = ({ emailElem, setIsLoading, setNewPassEmail, setNewPassIsSent }) => {

  const { usePopUp } = useContext(PopUpContext);

  const handleNewPassword = (e) => {
    const setters = { usePopUp, setIsLoading, setNewPassIsSent };
    NewPasswordHelpers.handleSendPasswordEmail(e, { emailElem, setters });
    setNewPassEmail(emailElem.current.value);
  };

  return (
    <LoginOption >
      <button
        className="text-primary-dark"
        onClick={handleNewPassword}
      >
        Recuperar contraseña
      </button>
    </LoginOption>
  )
}
