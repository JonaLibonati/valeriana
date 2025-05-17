import React from "react";
import { Loading } from "../globalComponents/loading/Loading";
import { ChevronRightIcon } from "../globalComponents/icons/ChevronRightIcon";
import { useUser } from "../../contexts/UserContext";

export const PasswordModule = () => {
  const { handleSendNewPassEmail, isLoadingNewPassEmail } = useUser();

  return (
    <Loading isLoading={isLoadingNewPassEmail} color={"bg-primary-dark"}>
      <button
        onClick={handleSendNewPassEmail}
        className="flex items-center gap-1 text-secondary-base hover:text-primary-dark"
      >
        <p>Cambiar contraseña</p>
        <ChevronRightIcon />
      </button>
    </Loading>
  );
};
