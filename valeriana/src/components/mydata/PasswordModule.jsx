import React, { useContext, useState } from "react";
import { Loading } from "../globalComponents/loading/Loading";
import { ChevronRightIcon } from "../globalComponents/icons/ChevronRightIcon";
import { UserContext } from "../../contexts/UserContext";
import { PopUpContext } from "../../contexts/PopUpContext";
import { NewPasswordHelpers } from "../../helpers/newPasswordHelpers";

export const PasswordModule = () => {
  const { user } = useContext(UserContext);
  const { usePopUp } = useContext(PopUpContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleNewPassword = (e) => {
    const setters = { usePopUp, setIsLoading };
    NewPasswordHelpers.handleSendPasswordEmailInApp(e, {
      user: user.data.current,
      setters,
    });
  };

  return (
    <Loading isLoading={isLoading} color={"bg-primary-dark"}>
      <button
        onClick={handleNewPassword}
        className="flex items-center gap-1 text-secondary-base hover:text-primary-dark"
      >
        <p>Cambiar contraseña</p>
        <ChevronRightIcon />
      </button>
    </Loading>
  );
};
