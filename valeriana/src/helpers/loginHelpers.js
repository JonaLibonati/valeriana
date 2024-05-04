import { userLogin } from "../api/userLogin";

export class LoginHelpers {
  static async handleSubmit(e, { setters }) {
    e.preventDefault();

    const { usePopUp, setIsLoading } = setters;

    const userData = {
      email_address: e.target[0].value == "" ? undefined : e.target[0].value,
      user_password: e.target[1].value == "" ? undefined : e.target[1].value,
    };

    e.target[1].value = "";

    setIsLoading(true);

    try {
      const { res, body } = await userLogin(userData);

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
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }

}
