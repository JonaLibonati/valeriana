import React, { useContext } from "react";
import { Input } from "../globalComponents/Input";
import { Submit } from "../globalComponents/Submit";
import { UserContext } from "../../contexts/UserContext";
import { validateUser } from "../../schemes/userSchema";
import { userCreate } from "../../api/userCreate";
import { Roles } from "./Roles";
import { GoBackButton } from "../globalComponents/GoBackButton";

export const Register = () => {
  const { userData, setUserData, handleOnChange } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = validateUser(userData);

    if (user.success) {
      userCreate(user.data)
        .then((res) => {
          console.log(res);
          setUserData({});
        })
        .catch((res) => console.error(res.json()));
    } else console.error(user.error);
  };

  const handleGoBack = () => {
    setUserData((data) => ({ ...data, user_roleId: undefined }));
  };

  const inputList = [
    {
      name: "first_name",
      type: "text",
      placeholder: "Nombre",
    },
    {
      name: "last_name",
      type: "text",
      placeholder: "Apellido",
    },
    {
      name: "user_name",
      type: "text",
      placeholder: "Nombre de Usuario",
    },
    {
      name: "email_address",
      type: "email",
      placeholder: "eMail",
    },
    {
      name: "confirm_email",
      type: "email",
      placeholder: "Confirmar eMail",
    },
    {
      name: "user_password",
      type: "password",
      placeholder: "Contraseña",
    },
    {
      name: "confirm_password",
      type: "password",
      placeholder: "Confirmar contraseña",
      autocomplete: "off",
    },
  ];

  return (
    <>
      {userData.user_roleId === undefined ? (
        <Roles />
      ) : (
        <>
          <GoBackButton handleClick={handleGoBack} />
          <p className="text-4xl mt-4 mb-4 text-gray-400">
            {userData.user_roleId === "2"
              ? "Doctor/a"
              : userData.user_roleId === "3"
              ? "Paciente"
              : ""}
            , ¿Quien&nbsp;eres?
          </p>
          <form className="flex flex-wrap" onSubmit={handleSubmit}>
            {inputList.map((elem) => (
              <Input
                key={elem.name}
                name={elem.name}
                type={elem.type}
                placeholder={elem.placeholder}
                handleOnChange={handleOnChange}
              />
            ))}
            <Submit text={"Crear"} />
          </form>
        </>
      )}
    </>
  );
};
