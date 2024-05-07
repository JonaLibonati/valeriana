import { createContext, useEffect, useRef, useState } from "react";
import { SelfUser } from "../api/selfUser";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const userData = useRef({});
  const role = useRef('');

  const user = {
    data: userData,
    role,
    setUserName,
    setFirstName,
    setLastName,
    setEmail
  }

  useEffect(() => {
    SelfUser.getAll()
      .then(({ body }) => {
        user.setUserName(body.user_name);
        user.setFirstName(body.first_name);
        user.setLastName(body.last_name);
        user.setEmail(body.email_address);
        user.data.current = body;
        user.role.current = body.user_roleId;
      })
      .catch(console.error)
  }, [])

  const [isLoadingUserName, setIsLoadingUserName] = useState(false);
  const [isLoadingFirstName, setIsLoadingFirstName] = useState(false);
  const [isLoadingLastName, setIsLoadingLastName] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  class UserHelpers {

    static async handleNewUserName(e, { setters }) {

      e.preventDefault();

      const { user_name } = user.data.current;

      const { usePopUp } = setters;

      const userData = {
        user_name: e.target[0].value == "" ? undefined : e.target[0].value,
      };

      if (user_name !== userData.user_name) {
        setIsLoadingUserName(true);
        try {
          const { res, body } = await SelfUser.setUserName(userData);
          const { user_name } = body;

          if (res.status === 200) {
            usePopUp("Usuario actualizado correctamente", "success");
            user.data.current = { ...user.data.current, user_name };
          }
        } catch (e) {
          usePopUp("Ups! Algo no ha salido bien.", "error")
          console.error(e);
        }
        setIsLoadingUserName(false);
      }
    }

    static async handleNewFirstName(e, { setters }) {

      e.preventDefault();

      const { first_name } = user.data.current;

      const { usePopUp } = setters;

      const userData = {
        first_name: e.target[0].value == "" ? undefined : e.target[0].value,
      };

      if (first_name !== userData.first_name) {
        setIsLoadingFirstName(true);

        try {
          const { res, body } = await SelfUser.setFirstName(userData);
          const { first_name } = body;

          if (res.status === 200) {
            usePopUp("Usuario actualizado correctamente", "success")
            user.data.current = { ...user.data.current, first_name };
          }
        } catch (e) {
          usePopUp("Ups! Algo no ha salido bien.", "error")
          console.error(e);
        }
        setIsLoadingFirstName(false);
      }
    }

    static async handleNewLastName(e, { setters }) {
      e.preventDefault();

      const { last_name } = user.data.current;
      const { usePopUp } = setters;

      const userData = {
        last_name: e.target[0].value == "" ? undefined : e.target[0].value,
      };

      if (last_name !== userData.last_name) {
        setIsLoadingLastName(true);

        try {
          const { res, body } = await SelfUser.setLastName(userData);
          const { last_name } = body;

          if (res.status === 200) {
            usePopUp("Usuario actualizado correctamente", "success");
            user.data.current = { ...user.data.current, last_name };
          }
        } catch (e) {
          usePopUp("Ups! Algo no ha salido bien.", "error")
          console.error(e);
        }
        setIsLoadingLastName(false);
      }
    }

    static async handleNewEmail(e, { setters }) {
      e.preventDefault();

      const { email_address } = user.data.current;
      const { usePopUp } = setters;

      const userData = {
        email_address: e.target[0].value == "" ? undefined : e.target[0].value,
      };

      if (email_address !== userData.email_address) {
        setIsLoadingEmail(true);
        try {
          const { res, body } = await SelfUser.setEmail(userData);
          const { email_address } = body;

          if (res.status === 200) {
            usePopUp("Usuario actualizado correctamente", "success");
            user.data.current = { ...user.data.current, email_address };
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

    static async handleNewPassword(e, { setters }) {

    }
  }

  return (
    <UserContext.Provider
      value={{
        userName,
        firstName,
        lastName,
        email,
        user,
        UserHelpers,
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
