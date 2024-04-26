export class UserHelpers {

  static async handleNewUserName(e, { setters }) {
    setIsLoading(true);

    try {
      const { res, body } = await userLogin(userData);

      console.log(body);

      if (res.status === 200) {
        window.location.href = "/app/user/home";
      } else {
        if (res.status === 401 && body.code === "ER_WRONG_LOG") {
          setErrorText("eMail o contraseña incorrectas");
        } else {
          setErrorText("Ups! Algo a salido mal");
        }
        setErrorPopUp(true);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }

  static async handleNewFirstName(e, { setters }) {

  }

  static async handleNewLastName(e, { setters }) {

  }

  static async handleNewEmail(e, { setters }) {

  }

  static async handleNewPassword(e, { setters }) {

  }
}