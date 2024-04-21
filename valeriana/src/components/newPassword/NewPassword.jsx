import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "../globalComponents/input/Input";
import { FilledButton } from "../globalComponents/Submit";
import { NewPasswordHelpers } from "./newPasswordHelpers";
import { ErrorText, useErrorText } from "../globalComponents/ErrorText";
import { Loading } from "../globalComponents/loading/Loading";

export const NewPassword = () => {
  const { errorText, errorTrigger, errorSetter } = useErrorText();

  const [isPassUpdated, setIsPassUpdated] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { token } = useParams();

  const handleSubmit = async (e) => {
    await NewPasswordHelpers.handleSubmit(e, {
      errorSetter,
      setIsPassUpdated,
      token,
    });
  };

  return (
    <>
      {isPassUpdated ? (
        <>
          <p className="text-lg mt-4 text-secondary-base">
            La contraseña se actualizó correctamente!
          </p>
          <button className="text-primary-dark mt-4">
            <Link to={"/app/login"}>Volver al login</Link>
          </button>
        </>
      ) : (
        <>
          <form className="flex flex-wrap" onSubmit={handleSubmit}>
            <Input
              name={"user_password"}
              type={"password"}
              placeholder={"Nueva contraseña"}
            />
            <Input
              name={"confirm_password"}
              type={"password"}
              placeholder={"Confirmar contraseña"}
            />
            <ErrorText errorText={errorText} errorTrigger={errorTrigger} />
            <FilledButton>
              <Loading isLoading={isLoading} color={"bg-tertiary-light"}>
                <input value="Enviar" type="submit" />
              </Loading>
            </FilledButton>
          </form>
        </>
      )}
    </>
  );
};
