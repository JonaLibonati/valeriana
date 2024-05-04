import { SelfUser } from "../api/selfUser";

export class UserHelpers {

  static async handleNewUserName(userData, { setters }) {

    const { usePopUp, setIsLoading, setCurrentUser } = setters;

    setIsLoading(true);
    try {
      const { res, body } = await SelfUser.setUserName(userData);
      const { user_name } = body;

      if (res.status === 200) {
        usePopUp("Usuario actualizado correctamente", "success");
        setCurrentUser((current) => {return {...current, user_name}})
      }
    } catch (e) {
      usePopUp("Ups! Algo no ha salido bien.", "error")
      console.error(e);
    }
    setIsLoading(false);
  }

  static async handleNewFirstName(userData, { setters }) {
    const { usePopUp, setIsLoading, setCurrentUser } = setters;

    setIsLoading(true);

    try {
      const { res, body } = await SelfUser.setFirstName(userData);
      const { first_name } = body;

      if (res.status === 200) {
        usePopUp("Usuario actualizado correctamente", "success")
        setCurrentUser((current) => {return {...current, first_name}})
      }
    } catch (e) {
      usePopUp("Ups! Algo no ha salido bien.", "error")
      console.error(e);
    }
    setIsLoading(false);
  }

  static async handleNewLastName(userData, { setters }) {
    const { usePopUp, setIsLoading, setCurrentUser } = setters;

    setIsLoading(true);

    try {
      const { res, body } = await SelfUser.setLastName(userData);
      const { last_name } = body;

      if (res.status === 200) {
        usePopUp("Usuario actualizado correctamente", "success");
        setCurrentUser((current) => {return {...current, last_name}});
      }
    } catch (e) {
      usePopUp("Ups! Algo no ha salido bien.", "error")
      console.error(e);
    }
    setIsLoading(false);
  }

  static async handleNewEmail(userData, { setters }) {
    const { usePopUp, setIsLoading, setCurrentUser } = setters;

    setIsLoading(true);
    try {
      const { res, body } = await SelfUser.setEmail(userData);
      const { email_address } = body;

      if (res.status === 200) {
        usePopUp("Usuario actualizado correctamente", "success");
        setCurrentUser((current) => {return {...current, email_address}});
      } else if (res.status === 401) {
        usePopUp("Contraseña incorrecta.", "error");
      }
    } catch (e) {
      usePopUp("Ups! Algo no ha salido bien.", "error");
      console.error(e);
    }
    setIsLoading(false);
  }

  static async handleNewPassword(e, { setters }) {

  }
}