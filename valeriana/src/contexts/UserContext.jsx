import { createContext, useContext, useEffect, useState } from "react";
import { SelfUser } from "../api/selfUser";
import { validateFirstName, validateLastName, validateNewEmail, validateUserName } from "../schemes/userSchema";
import { useData } from "./DataContext";
import { usePopUpContext } from "./PopUpContext";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const { user, setUser } = useData();
  
  const { usePopUp } = usePopUpContext()

  const [userName, setUserName] = useState(user.user_name);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email_address);

  useEffect(() => {
    setUserName(user.user_name);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email_address);

  }, [user])

  const [isLoadingUserName, setIsLoadingUserName] = useState(false);
  const [isLoadingFirstName, setIsLoadingFirstName] = useState(false);
  const [isLoadingLastName, setIsLoadingLastName] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const handleNewUserName = async (e) => {

    e.preventDefault();

    let input = {
      user_name: e.target[0].value == "" ? undefined : e.target[0].value,
    };

    input = validateUserName(input);

    if (!input.success) {
      console.log(input.error.issues);
      const message = input.error.issues[0].message;

      message === "Required"
        ? usePopUp("Todos los campos son requeridos", "error")
        : usePopUp(message, "error");
      return;
    }

    if (user.user_name !== input.data.user_name) {
      setIsLoadingUserName(true);
      try {
        const { res, body } = await SelfUser.setUserName(input.data);
        const { user_name } = body;

        if (res.status === 200) {
          usePopUp("Usuario actualizado correctamente", "success");
          setUser(user => {return { ...user, user_name }});
        }
      } catch (error) {
        usePopUp("Ups! Algo no ha salido bien.", "error")
        console.error(error);
      }
      setIsLoadingUserName(false);
    }
  }

  const handleNewFirstName = async (e) => {

    e.preventDefault();

    let input = {
      first_name: e.target[0].value == "" ? undefined : e.target[0].value,
    };

    input = validateFirstName(input);

    if (!input.success) {
      console.log(input.error.issues);
      const message = input.error.issues[0].message;

      message === "Required"
        ? usePopUp("Todos los campos son requeridos", "error")
        : usePopUp(message, "error");
      return;
    }

    if (user.first_name !== input.data.first_name) {
      setIsLoadingFirstName(true);

      try {
        const { res, body } = await SelfUser.setFirstName(input.data);
        const { first_name } = body;

        if (res.status === 200) {
          usePopUp("Usuario actualizado correctamente", "success");
          setUser(user => {return { ...user, first_name }});
        }
      } catch (e) {
        usePopUp("Ups! Algo no ha salido bien.", "error")
        console.error(e);
      }
      setIsLoadingFirstName(false);
    }
  }

  const handleNewLastName = async (e) => {
    e.preventDefault();

    let input = {
      last_name: e.target[0].value == "" ? undefined : e.target[0].value,
    };

    input = validateLastName(input);

    if (!input.success) {
      console.log(input.error.issues);
      const message = input.error.issues[0].message;

      message === "Required"
        ? usePopUp("Todos los campos son requeridos", "error")
        : usePopUp(message, "error");
      return;
    }

    if (user.last_name !== input.data.last_name) {
      setIsLoadingLastName(true);

      try {
        const { res, body } = await SelfUser.setLastName(input.data);
        const { last_name } = body;

        if (res.status === 200) {
          usePopUp("Usuario actualizado correctamente", "success");
          setUser(user => {return { ...user, last_name }});
        }
      } catch (e) {
        usePopUp("Ups! Algo no ha salido bien.", "error")
        console.error(e);
      }
      setIsLoadingLastName(false);
    }
  }

  const handleNewEmail = async (e) => {
    e.preventDefault();

    let input = {
      email_address: e.target[0].value == "" ? undefined : e.target[0].value,
      confirm_email: e.target[1].value == "" ? undefined : e.target[1].value,
      user_password: e.target[2].value == "" ? undefined : e.target[2].value,
    };

    input = validateNewEmail(input);


    if (!input.success) {
      console.log(input.error.issues);
      const message = input.error.issues[0].message;

      message === "Required"
        ? usePopUp("Todos los campos son requeridos", "error")
        : usePopUp(message, "error");
      return;
    }

    if (user.email_address !== input.data.email_address) {
      setIsLoadingEmail(true);
      try {
        const { res, body } = await SelfUser.setEmail(input.data);
        const { email_address } = body;

        if (res.status === 200) {
          usePopUp("Usuario actualizado correctamente", "success");
          setUser(user => {return { ...user, email_address }});
        } else if (res.status === 401) {
          usePopUp("Contraseña incorrecta.", "error");
        }
      } catch (e) {
        usePopUp("Ups! Algo no ha salido bien.", "error");
        console.error(e);
      }
      setIsLoadingEmail(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        handleNewUserName,
        handleNewFirstName,
        handleNewLastName,
        handleNewEmail,
        isLoadingUserName,
        isLoadingFirstName,
        isLoadingLastName,
        isLoadingEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
