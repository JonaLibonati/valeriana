import React from "react";
import { useParams } from "react-router-dom";
import { Input } from "../globalComponents/Input";
import { Submit } from "../globalComponents/Submit";
import { validateUser } from "../../schemes/userSchema";

export const NewPassword = () => {

  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email_address: e.target[0].value,
      user_password: e.target[1].value,
    };

    const user = validateUser(userData);

    if (user.success) {
    /*  userCreate(user.data)
        .then((res) => {
          console.log(res);
          setUserData({});
        })
        .catch((res) => console.error(res.json())); */
    } else console.error(user.error); 
  }

  console.log(token)

  return (
    <>
      <form className="flex flex-wrap mb-8 mt-8" onSubmit={handleSubmit}>
        <Input name={"user_password"} type={"password"} placeholder={"Nueva contraseña"} />
        <Input name={"confirm_password"} type={"password"} placeholder={"Confirmar contraseña"} />
        <Submit text={"Enviar"} />
      </form>
    </>
  );
};
