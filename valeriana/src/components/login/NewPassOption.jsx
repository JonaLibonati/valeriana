import React from 'react'
import { LoginOption } from './LoginOption'
import { useLogin } from '../../contexts/LoginContext';

export const NewPassOption = ({ emailElem }) => {

  const { handleSendNewPassEmail, setLogInEmail} = useLogin();

  const handleClick = async (e) => {
    setLogInEmail(emailElem.current.value);
    await handleSendNewPassEmail( e, emailElem.current.value)
  };

  return (
    <LoginOption >
      <button
        className="text-primary-dark"
        onClick={handleClick}
      >
        Recuperar contraseña
      </button>
    </LoginOption>
  )
}
