import React, { useRef } from "react";
import { Input } from "../globalComponents/input/Input";
import { Loading } from "../globalComponents/loading/Loading";
import { FilledButton } from "../globalComponents/buttons/FilledButton";
import { NewPassOption } from "./NewPassOption";
import { NewUserOption } from "./NewUserOption";
import { useLogin } from "../../contexts/LoginContext";

export const LoginForm = () => {
  const emailElem = useRef(null);

  const { handleLogIn, isLoading } = useLogin();

  return (
    <form className="flex flex-wrap" onSubmit={(e) => handleLogIn(e)}>
      <Input
        name={"email_address"}
        type={"email"}
        placeholder={"eMail"}
        vref={emailElem}
      />
      <Input
        name={"user_password"}
        type={"password"}
        placeholder={"Contraseña"}
      />
      <div className="basis-full min-h-[100px] mt-8">
        <Loading isLoading={isLoading} color={"bg-primary-dark"}>
          <FilledButton>
            <input className="h-10 sm:text-lg" value="Ingresa" type="submit" />
          </FilledButton>
          <div className="m-auto mt-4 max-w-[320px] text-center">
            <NewPassOption emailElem={emailElem} />
            <NewUserOption />
          </div>
        </Loading>
      </div>
    </form>
  );
};
