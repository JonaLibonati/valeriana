import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../globalComponents/input/Input";
import { LoginHelpers } from "./loginHelpers";
import { GoBackButton } from "../globalComponents/GoBackButton";
import { ErrorText, useErrorText } from "../globalComponents/ErrorText";
import { Loading } from "../globalComponents/loading/Loading";
import { FilledButton } from "../globalComponents/Submit";

export const LoginForm = () => {
  const emailElem = useRef(null);

  const { errorText, errorTrigger, errorSetter } = useErrorText();

  const [isLoading, setIsLoading] = useState(false);

  const [newPassIsSent, setNewPassIsSent] = useState(false);

  const [newPassEmail, setNewPassEmail] = useState(undefined);

  const handleSubmit = (e) => {
    const setters = { ...errorSetter, setIsLoading };
    LoginHelpers.handleSubmit(e, { setters });
  };

  const handleNewPassword = (e) => {
    const setters = { ...errorSetter, setIsLoading, setNewPassIsSent };
    LoginHelpers.handleNewPassword(e, { emailElem, setters });
    setNewPassEmail(emailElem.current.value);
  };

  const handleGoBack = (e) => {
    setNewPassIsSent(false);
    errorSetter.setErrorText("\xa0");
  };

  return (
    <>
      {!newPassIsSent ? (
        <>
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
            <ErrorText errorText={errorText} errorTrigger={errorTrigger} />
            <div className="basis-full min-h-[100px]">
              <Loading isLoading={isLoading} color={"bg-primary-dark"}>
                <FilledButton>
                  <input value="Ingresa" type="submit" />
                </FilledButton>
                <div className="m-auto max-w-[320px] text-center">
                  <div className="flex flex-wrap justify-center mt-4 mb-3">
                    <p className="text-secondary-base">
                      Si te olvidaste tu contraseña
                    </p>
                    <button
                      className="text-primary-dark"
                      onClick={handleNewPassword}
                    >
                      Recuperar contraseña
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-center mb-3">
                    <p className="text-secondary-base">
                      Si todavia no tenes una&nbsp;cuenta
                    </p>
                    <button className="text-primary-dark">
                      <Link to={"/app/register"}>Crear usuario</Link>
                    </button>
                  </div>
                </div>
              </Loading>
            </div>
          </form>
        </>
      ) : (
        <>
          <GoBackButton handleClick={handleGoBack} />
          <p className="text-lg mt-4 text-secondary-base">
            Te enviamos un email para recuperar tu&nbsp;contraseña&nbsp;a:
          </p>
          <p className="text-lg mb-4 italic text-primary-dark">{newPassEmail}</p>
        </>
      )}
    </>
  );
};
