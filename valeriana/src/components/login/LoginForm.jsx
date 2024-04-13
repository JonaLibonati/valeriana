import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../globalComponents/Input";
import { Submit } from "../globalComponents/Submit";
import { LoginHelpers } from "./loginHelpers";
import { GoBackButton } from "../globalComponents/GoBackButton";

export const LoginForm = () => {
  const email_address = useRef(null);
  const errorElem = useRef(null);

  const [errorText, setErrorText] = useState("\xa0");
  const [newPassIsSent, setNewPassIsSent] = useState(false);
  const [newPassEmail, setNewPassEmail] = useState(false);

  const handleSubmit = (e) => {
    LoginHelpers.handleSubmit(e, {
      errorElem: errorElem,
      setErrorText: setErrorText,
    });
  };

  const handleNewPassword = (e) => {
    LoginHelpers.handleNewPassword(e, {
      emailElem: email_address,
      errorElem: errorElem,
      setErrorText: setErrorText,
      setNewPassIsSent: setNewPassIsSent,
      setNewPassEmail: setNewPassEmail
    });
  };

  useEffect(() => {
    errorElem.current.addEventListener(
      "transitionend",
      () => (errorElem.current.style.color = "rgb(156 163 175)")
    );
  }, []);

  return (
    <>
      { !newPassIsSent?
        <>
          <form className="flex flex-wrap mb-8 mt-8" onSubmit={handleSubmit}>
            <Input
              name={"email_address"}
              type={"email"}
              placeholder={"eMail"}
              vref={email_address}
            />
            <Input
              name={"user_password"}
              type={"password"}
              placeholder={"Contraseña"}
            />
            <p
              ref={errorElem}
              style={{ color: "white" }}
              className="ml-2 mt-2 text-sm italic transition-all duration-[1500ms]"
            >
              {errorText}
            </p>
            <Submit text={"Ingresa"} />
          </form>
          <div className="m-auto max-w-[320px] text-center">
            <div className="flex flex-wrap justify-center mb-3">
              <p className="text-gray-400">Si te olvidaste tu contraseña</p>
              <button className="text-rose-400" onClick={handleNewPassword}>
                Recuperar contraseña
              </button>
            </div>
            <div className="flex flex-wrap justify-center mb-3">
              <p className="text-gray-400">
                Si todavia no tenes una&nbsp;cuenta
              </p>
              <button className="text-rose-400">
                <Link to={"/app/register"}>Crear usuario</Link>
              </button>
            </div>
          </div>
        </> :
        <>
          <GoBackButton handleClick={()=> setNewPassIsSent(false)} />
          <p className="text-lg mt-4 text-gray-400">
            Te enviamos un email para recuperar tu&nbsp;contraseña&nbsp;a:
          </p>
          <p className="text-lg mb-4 italic text-rose-400">{newPassEmail}</p>
        </>
      }
    </>
  );
};
