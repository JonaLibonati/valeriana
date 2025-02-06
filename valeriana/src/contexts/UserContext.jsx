import { createContext, useEffect, useRef, useState } from "react";
import { SelfUser } from "../api/selfUser";
import { validateFirstName, validateLastName, validateNewEmail, validateUserName } from "../schemes/userSchema";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const userData = useRef({});
  const roleId = useRef('');
  const role = useRef('');

  const user = {
    data: userData,
    roleId,
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
        user.roleId.current = body.user_roleId;
        user.role.current = body.role_name;
      })
      .catch(console.error)
  }, [user.role.current])

  const [isLoadingUserName, setIsLoadingUserName] = useState(false);
  const [isLoadingFirstName, setIsLoadingFirstName] = useState(false);
  const [isLoadingLastName, setIsLoadingLastName] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  class UserHelpers {

    static async handleNewUserName(e, { setters }) {

      e.preventDefault();

      const { user_name } = user.data.current;

      const { usePopUp } = setters;

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

      if (user_name !== input.data.user_name) {
        setIsLoadingUserName(true);
        try {
          const { res, body } = await SelfUser.setUserName(input.data);
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

      if (first_name !== input.data.first_name) {
        setIsLoadingFirstName(true);

        try {
          const { res, body } = await SelfUser.setFirstName(input.data);
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

      if (last_name !== input.data.last_name) {
        setIsLoadingLastName(true);

        try {
          const { res, body } = await SelfUser.setLastName(input.data);
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

      if (email_address !== input.data.email_address) {
        setIsLoadingEmail(true);
        try {
          const { res, body } = await SelfUser.setEmail(input.data);
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
