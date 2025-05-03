import React, { useState } from 'react'
import { useLogin } from '../contexts/LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Input } from '../components/globalComponents/input/Input';
import { FilledButton } from '../components/globalComponents/buttons/FilledButton';
import { Loading } from '../components/globalComponents/loading/Loading';

export const NewPasswordPage = () => {
  const { handleSubmitNewPass, isLoading, isPassUpdated } = useLogin();

  const { token } = useParams();

  const handleSubmit = async (e) => {
    await handleSubmitNewPass(e, {token});
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
}
