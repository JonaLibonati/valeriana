import React, { useContext, useRef, useState } from "react";
import { Input } from "../globalComponents/input/Input";
import { LoginHelpers } from "../../helpers/loginHelpers";
import { Loading } from "../globalComponents/loading/Loading";
import { FilledButton } from "../globalComponents/buttons/FilledButton";
import { ErrorContext } from "../../contexts/ErrorContext";
import { NewPassOption } from "./NewPassOption";
import { NewUserOption } from "./NewUserOption";

export const LoginForm = ({ setNewPassIsSent, setNewPassEmail }) => {
  const emailElem = useRef(null);

  const { setErrorText, setErrorPopUp } = useContext(ErrorContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    const setters = { setErrorText, setErrorPopUp, setIsLoading };
    LoginHelpers.handleSubmit(e, { setters });
  };

  return (
    <form className="flex flex-wrap" onSubmit={handleSubmit}>
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
            <NewPassOption emailElem={emailElem} setIsLoading={setIsLoading} setNewPassIsSent={setNewPassIsSent} setNewPassEmail={setNewPassEmail} />
            <NewUserOption />
          </div>
        </Loading>
      </div>
    </form>
  );
};
