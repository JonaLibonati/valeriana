import React from 'react';
import { ChevronRightIcon } from '../globalComponents/icons/ChevronRightIcon';


export const PasswordModule = () => {
  return (
    <button className="flex items-center gap-1 text-secondary-base hover:text-primary-dark">
      <p>Cambiar contraseña</p>
      <ChevronRightIcon />
    </button>
  )
}
