import { useState } from "react"
import { Roles } from "../components/register/Roles";
import { SuccessRegisterMessage } from "../components/register/SuccessRegisterMessage";
import { RegisterForm } from "../components/register/RegisterForm";

export const RegisterPage = () => {

  const [roleId, setRoleId] = useState(undefined);

  const [userIsCreated, setUserIsCreated] = useState(false);

  return (
      <>
      {roleId === undefined ? (
        <Roles setRoleId={setRoleId} />
      ) : userIsCreated ? (
        <SuccessRegisterMessage />
      ) : (
        <RegisterForm roleId={roleId} setUserIsCreated={setUserIsCreated} setRoleId={setRoleId} />
      )}
    </>
  )
}

