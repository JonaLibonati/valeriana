import React, { useEffect } from "react";
import { Loading } from "../globalComponents/loading/Loading";
import { useUser } from "../../contexts/UserContext";

export const ValidationEmail = () => {

  const { user, handleSendVerificationEmail, isLoadingVerificationEmail, wasVerificationEmailSent } = useUser()

  useEffect(() => {
    handleSendVerificationEmail();
  }, []);

  return (
    <Loading isLoading={isLoadingVerificationEmail} color={"bg-primary-dark"}>
      <p className="text-4xl mt-4 text-secondary-base">
        Solo nos&nbsp;falta un&nbsp;paso...
      </p>
      <p className="text-lg mt-4 text-secondary-base">
        Te enviamos un email para verificar&nbsp;tu&nbsp;cuenta:
      </p>
      <p className="text-lg mb-4 italic text-primary-dark">{user.email}</p>
      <p className="text-lg mt-4 mb-4 text-secondary-base">
        Si no te ha llegado,&nbsp;puedes{" "}
        <button className="text-primary-dark white-space-nowrap">
          mandar un nuevo email.
        </button>
      </p>
      <p className="text-lg mt-4 mb-4 text-secondary-base">
        Si no es correcto,&nbsp;puedes{" "}
        <button className="text-primary-dark white-space-nowrap">
          modificar tu email.
        </button>
      </p>
    </Loading>
  );
};
