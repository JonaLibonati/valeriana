import React, { useState, useEffect, useRef } from "react";
import { SelfUser } from "../../api/selfUser";
import { Loading } from "../globalComponents/loading/Loading";

export const ValidationEmail = () => {
  const [email, setEmail] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);

  let firstRender = true;

  useEffect(() => {
    if (!firstRender) {
      setIsLoading(true);
      SelfUser.getVerificationEmail()
        .then(({ res, body }) => {
          console.log(res);
          setEmail(body.email_address);
          setIsLoading(false);
        })
        .catch(console.error);
    }

    return (() => firstRender = false)
  }, []);

  return (
    <Loading isLoading={isLoading} color={"bg-primary-dark"}>
      <p className="text-4xl mt-4 text-secondary-base">
        Solo nos&nbsp;falta un&nbsp;paso...
      </p>
      <p className="text-lg mt-4 text-secondary-base">
        Te enviamos un email para verificar&nbsp;tu&nbsp;cuenta:
      </p>
      <p className="text-lg mb-4 italic text-primary-dark">{email}</p>
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
