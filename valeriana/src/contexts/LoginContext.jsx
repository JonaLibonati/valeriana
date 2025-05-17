import { createContext, useContext, useEffect, useState } from 'react';
import { usePopUpContext } from "./PopUpContext";
import { User } from '../api/user';
import { validateAllUser, validateNewPassword } from '../schemes/userSchema';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {

  const { usePopUp } = usePopUpContext();

  const [newPassIsSent, setNewPassIsSent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isPassUpdated, setIsPassUpdated] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);

  const [logInEmail, setLogInEmail] = useState(false);


  const handleLogIn = async (e) => {
    e.preventDefault();

    console.log(e);

    const userData = {
      email_address: e.target[0].value == "" ? undefined : e.target[0].value,
      user_password: e.target[1].value == "" ? undefined : e.target[1].value,
    };

    e.target[1].value = "";

    setIsLoading(true);

    try {
      const { res, body } = await User.login(userData);

      console.log(body);

      if (res.status === 200) {
        window.location.href = "/app/user/home";
      } else {
        if (res.status === 401 && body.code === "ER_WRONG_LOG") {
          usePopUp("eMail o contraseña incorrectas", "error");
        } else {
          usePopUp("Ups! Algo a salido mal", "error");
        }
      }
    } catch (error) {
      console.error(error);
      usePopUp(`Ups! Algo a salido mal ${error}`, "error");
    }
    setIsLoading(false);
  }

  const handleSendNewPassEmail = async (e, email) => {
      const userData = {
        email_address:
        email == "" ? undefined : email,
      };
      setIsLoading(true);

      try {
        const { res, body } = await User.sendNewPassEmail(userData);

        if (res.status === 200) {
          setNewPassIsSent(true);
        } else {
          if (res.status === 401 && body.code === "ER_WRONG_LOG") {
            usePopUp("La cuenta no existe.", "error");
          } else {
            usePopUp("Ups! Algo a salido mal.", "error");
          }
        }
      } catch (error) {
        console.error(error);
        usePopUp(`Ups! Algo a salido mal ${error}`, "error");
      }
      setIsLoading(false);
  }

  const handleSubmitNewPass = async (e, { token }) => {
    e.preventDefault();

    const userData = {
      user_password: e.target[0].value == "" ? undefined : e.target[0].value,
      confirm_password: e.target[1].value == "" ? undefined : e.target[1].value,
      token: token,
    };

    const user = validateNewPassword(userData);

    if (!user.success) {
      console.log(user.error.issues);

      let arePassEqual = true;

      user.error.issues.map((e) => {
        if (e.code == "custom") {
          usePopUp("Las contraseñas no son iguales.", "error");
          arePassEqual = false;
        }
      });

      arePassEqual
        ? usePopUp("Se requieren ambos campos.", "error")
        : usePopUp("Las contraseñas no son iguales.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const { res, body } = await User.setNewPass(userData);

      if (res.status === 200) {
        setIsPassUpdated(true);
      } else if (res.status === 401 && body.code === "ER_WRONG_LOG") {
        usePopUp("Token no es valido o ha vencido.", "error");
      } else {
        usePopUp("Ups! Algo a salido mal.", "error");
      }
      console.log(res);
      console.log(body);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }

  const handleCreateNewUser = async (e, { roleId }) => {
    e.preventDefault();

    let user = {
      user_roleId: roleId  == "" ? undefined : roleId,
      first_name: e.target[0].value == "" ? undefined : e.target[0].value,
      last_name: e.target[1].value == "" ? undefined : e.target[1].value,
      user_name: e.target[2].value == "" ? undefined : e.target[2].value,
      email_address: e.target[3].value == "" ? undefined : e.target[3].value,
      confirm_email: e.target[4].value == "" ? undefined : e.target[4].value,
      user_password: e.target[5].value == "" ? undefined : e.target[5].value,
      confirm_password: e.target[6].value == "" ? undefined : e.target[6].value,
    };

    user = validateAllUser(user);

    if (!user.success) {
      console.log(user.error.issues);
      const message = user.error.issues[0].message;

      message === "Required"
        ? usePopUp("Todos los campos son requeridos", "error")
        : usePopUp(message, "error");
      return;
    }

    setIsLoading(true);

    try {
      const { res, body } = await User.create(user.data);
      if (res.status === 201) {
        console.log(body);
        setIsUserCreated(true);
      } else {
        if (res.status === 400 && body.code === "ER_DUP_ENTRY_USER_NAME") {
          usePopUp("El nombre de usuario ya esta en uso", "error");
        } else if (res.status === 400 && body.code === "ER_DUP_ENTRY_EMAIL") {
          usePopUp("El email ya esta en uso", "error");
        } else {
          usePopUp("Ups! Algo a salido mal", "error");
        }
      }
      setIsLoading(false);
    } catch {
      console.error(e);
      setIsLoading(false);
    }
  }

  return (
    <LoginContext.Provider
      value={{
        newPassIsSent,
        setNewPassIsSent,
        logInEmail,
        setLogInEmail,
        handleLogIn,
        handleSendNewPassEmail,
        handleSubmitNewPass,
        handleCreateNewUser,
        isLoading,
        isPassUpdated,
        isUserCreated,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export const registerInputList = [
  {
    name: "first_name",
    type: "text",
    placeholder: "Nombre",
    maxlength: 30,
  },
  {
    name: "last_name",
    type: "text",
    placeholder: "Apellido",
    maxlength: 30,
  },
  {
    name: "user_name",
    type: "text",
    placeholder: "Nombre de Usuario",
    maxlength: 20,
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