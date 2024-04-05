import React, { useContext } from "react";
import { Input } from "../globalComponents/Input";
import { Submit } from "../globalComponents/Submit";
import { LoginContext } from "../../contexts/LoginContext";
import { userLogin } from "../../api/userLogin";

export const LoginForm = () => {
  const { loginData, setLoginData } = useContext(LoginContext);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData((logElem) => ({ ...logElem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    userLogin(loginData)
      .then((res) => console.log(res))
      .catch(console.error);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Input
        name={"email_address"}
        type={"email"}
        placeholder={"eMail"}
        handleOnChange={handleOnChange}
      />
      <Input
        name={"user_password"}
        type={"password"}
        placeholder={"Contraseña"}
        handleOnChange={handleOnChange}
      />
      <Submit text={"Ingresa"} />
    </form>
  );
};
