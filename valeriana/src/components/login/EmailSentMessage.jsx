import React from 'react';
import { GoBackButton } from "../globalComponents/buttons/GoBackButton";
import { useLogin } from '../../contexts/LoginContext';

export const EmailSentMessage = ({ email }) => {

  const { setNewPassIsSent, logInEmail } = useLogin();

  return (
    <>
          <GoBackButton handleClick={() => setNewPassIsSent(false)} />
          <p className="text-lg mt-4 text-secondary-base">
            Te enviamos un email para recuperar tu&nbsp;contraseña&nbsp;a:
          </p>
          <p className="text-lg mb-4 italic text-primary-dark">{logInEmail}</p>
        </>
  )
}
