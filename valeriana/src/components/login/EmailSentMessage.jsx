import React from 'react';
import { GoBackButton } from "../globalComponents/GoBackButton";

export const EmailSentMessage = ({ handleGoBack, email }) => {
  return (
    <>
          <GoBackButton handleClick={handleGoBack} />
          <p className="text-lg mt-4 text-secondary-base">
            Te enviamos un email para recuperar tu&nbsp;contraseña&nbsp;a:
          </p>
          <p className="text-lg mb-4 italic text-primary-dark">{email}</p>
        </>
  )
}
