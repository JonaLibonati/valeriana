import React, { useContext } from 'react'
import { NewPasswordHelpers } from "../../helpers/newPasswordHelpers";
import { LoginOption } from './LoginOption'
import { ErrorContext } from '../../contexts/ErrorContext';

export const NewPassOption = ({ emailElem, setIsLoading, setNewPassEmail, setNewPassIsSent }) => {

  const { setErrorText, setErrorPopUp } = useContext(ErrorContext);

  const handleNewPassword = (e) => {
    const setters = { setErrorText, setErrorPopUp, setIsLoading, setNewPassIsSent };
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
