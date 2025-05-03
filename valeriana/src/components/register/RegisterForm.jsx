import React from "react";
import { Loading } from "../globalComponents/loading/Loading";
import { Input } from "../globalComponents/input/Input";
import { FilledButton } from "../globalComponents/buttons/FilledButton";
import { GoBackButton } from "../globalComponents/buttons/GoBackButton";
import { registerInputList, useLogin } from "../../contexts/LoginContext";

export const RegisterForm = ({ roleId, setRoleId }) => {

  const { handleCreateNewUser, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    await handleCreateNewUser(e, {
      roleId,
    });
  };

  const handleGoBack = () => {
    setRoleId(undefined);
  };

  return (
    <>
      <GoBackButton handleClick={handleGoBack} />
      <p className="text-4xl mt-4 mb-4 text-secondary-base">
        {roleId === 2
          ? "Doctor/a"
          : roleId === 3
            ? "Paciente"
            : ""}
        , ¿Quien&nbsp;eres?
      </p>
      <form className="flex flex-wrap" onSubmit={handleSubmit}>
        {registerInputList.map((elem) => (
          <Input
            key={elem.name}
            name={elem.name}
            type={elem.type}
            placeholder={elem.placeholder}
            maxLength={elem.maxlength}
          />
        ))}
        <div className="mt-8 w-full">
          <FilledButton>
            <Loading isLoading={isLoading} color={"bg-tertiary-light"}>
              <input className="h-10 sm:text-lg" value="Crear" type="submit" />
            </Loading>
          </FilledButton>
        </div>
      </form>
    </>
  );
};
