import { useState } from "react"
import { Roles } from "../components/register/Roles";
import { SuccessRegisterMessage } from "../components/register/SuccessRegisterMessage";
import { RegisterForm } from "../components/register/RegisterForm";
import { useLogin } from "../contexts/LoginContext";

export const RegisterPage = () => {

  const { isUserCreated } = useLogin();

  const [roleId, setRoleId] = useState(undefined);

  return (
      <>
      {roleId === undefined ? (
        <Roles setRoleId={setRoleId} />
      ) : isUserCreated ? (
        <SuccessRegisterMessage />
      ) : (
        <RegisterForm roleId={roleId} setRoleId={setRoleId} />
      )}
    </>
  )
}

