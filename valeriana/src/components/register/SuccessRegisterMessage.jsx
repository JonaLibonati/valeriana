import React from 'react';
import { Link } from "react-router-dom";

export const SuccessRegisterMessage = () => {
  return (
    <>
      <p className="text-lg mt-4 text-secondary-base">
        Usuario creado correctamente!
      </p>
      <button className="text-primary-dark mt-4">
        <Link to={"/app/login"}>Volver al login</Link>
      </button>
    </>
  )
}
