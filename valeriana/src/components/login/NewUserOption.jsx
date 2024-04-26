import React from 'react'
import { Link } from "react-router-dom";
import { LoginOption } from './LoginOption'

export const NewUserOption = () => {
  return (
    <LoginOption>
        <Link className="text-primary-dark" to={"/app/register"}>Crear usuario</Link>
    </LoginOption>
  )
}
