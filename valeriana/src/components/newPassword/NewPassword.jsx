import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "../globalComponents/input/Input";
import { FilledButton } from "../globalComponents/buttons/FilledButton";
import { NewPasswordHelpers } from "../../helpers/newPasswordHelpers";
import { Loading } from "../globalComponents/loading/Loading";
import { PopUpContext } from "../../contexts/PopUpContext";

export const NewPassword = () => {
  const {usePopUp} = useContext(PopUpContext);

  const [isPassUpdated, setIsPassUpdated] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { token } = useParams();

  const handleSubmit = async (e) => {
    const setters = {usePopUp, setIsLoading, setIsPassUpdated }
    await NewPasswordHelpers.handleSubmit(e, {
      setters,
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
            <FilledButton>
              <Loading isLoading={isLoading} color={"bg-tertiary-light"}>
                <input className="h-10 sm:text-lg" value="Enviar" type="submit" />
              </Loading>
            </FilledButton>
          </form>
        </>
      )}
    </>
  );
};
