import React, { useState, useEffect, useRef } from "react";
import { SelfUser } from "../../api/selfUser";

export const ValidationEmail = () => {
  const [email, setEmail] = useState(undefined);

  let firstRender = true;
  useEffect(() => {
    if (!firstRender) {
      console.log(firstRender)
      SelfUser.getVerificationEmail()
        .then(({ res, body }) => {
          console.log(res);
          setEmail(body.email_address);
        })
        .catch(console.error);
    }

    return (() => firstRender = false)
  }, []);

  return (
    <>
      {email ? (
        <>
          <p className="text-4xl mt-4  text-gray-400">
            Solo nos&nbsp;falta un&nbsp;paso...
          </p>
          <p className="text-lg mt-4 text-gray-400">
            Te enviamos un email para verificar&nbsp;tu&nbsp;cuenta:
          </p>
          <p className="text-lg mb-4 italic text-rose-400">{email}</p>
          <p className="text-lg mt-4 mb-4 text-gray-400">
            Si no te ha llegado,&nbsp;puedes{" "}
            <button className="text-rose-400 white-space-nowrap">
              mandar un nuevo email.
            </button>
          </p>
          <p className="text-lg mt-4 mb-4 text-gray-400">
            Si no es correcto,&nbsp;puedes{" "}
            <button className="text-rose-400 white-space-nowrap">
              modificar tu email.
            </button>
          </p>
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};
