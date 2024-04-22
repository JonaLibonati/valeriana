import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../globalComponents/loading/Loading";
import { Input } from "../globalComponents/input/Input";
import { FilledButton } from "../globalComponents/Submit";
import { GoBackButton } from "../globalComponents/GoBackButton";
import { ErrorText, useErrorText } from "../globalComponents/ErrorText";
import { UserContext } from "../../contexts/UserContext";
import { RegisterHelpers } from "./registerHelpers";
import { Roles } from "./Roles";

export const Register = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [userIsCreated, setUserIsCreated] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { errorText, errorTrigger, errorSetter } = useErrorText();

  const handleSubmit = (e) => {
    const setters = { ...errorSetter, setIsLoading, setUserIsCreated };
    RegisterHelpers.handleSubmit(e, {
      userData,
      setters
    });
  };

  const handleGoBack = () => {
    setUserData((data) => ({ ...data, user_roleId: undefined }));
  };

  return (
    <>
      {userData.user_roleId === undefined ? (
        <Roles />
      ) : userIsCreated ? (
        <>
          <p className="text-lg mt-4 text-secondary-base">
            Usuario creado correctamente!
          </p>
          <button className="text-primary-dark mt-4">
            <Link to={"/app/login"}>Volver al login</Link>
          </button>
        </>
      ) : (
        <>
          <GoBackButton handleClick={handleGoBack} />
          <p className="text-4xl mt-4 mb-4 text-secondary-base">
            {userData.user_roleId === "2"
              ? "Doctor/a"
              : userData.user_roleId === "3"
              ? "Paciente"
              : ""}
            , ¿Quien&nbsp;eres?
          </p>
          <form className="flex flex-wrap" onSubmit={handleSubmit}>
            {RegisterHelpers.inputList.map((elem) => (
              <Input
                key={elem.name}
                name={elem.name}
                type={elem.type}
                placeholder={elem.placeholder}
                maxLength={elem.maxlength}
              />
            ))}
            <ErrorText errorText={errorText} errorTrigger={errorTrigger} />
            <FilledButton>
              <Loading isLoading={isLoading} color={"bg-tertiary-light"}>
                <input value="Crear" type="submit" />
              </Loading>
            </FilledButton>
          </form>
        </>
      )}
    </>
  );
};
