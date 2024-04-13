import { userLogin } from "../../api/userLogin";
import { UserNewPassword, userNewPassword } from "../../api/userNewPassword";

export class LoginHelpers {
  static async handleSubmit(e, { errorElem, setErrorText }) {
    e.preventDefault();

    const userData = {
      email_address: e.target[0].value,
      user_password: e.target[1].value,
    };

    e.target[1].value = "";

    const { res, body } = await userLogin(userData);

    console.log(body);

    if (res.status === 200) {
      window.location.href = "/app/user";
    } else if (res.status === 401 && body.code === "ER_WRONG_LOG") {
      setErrorText("eMail o contraseña incorrectas");
      errorElem.current.style.color = "rgb(251 113 133)";
    } else {
      setErrorText("Ups! Algo a salido mal");
      errorElem.current.style.color = "rgb(251 113 133)";
    }
  }

  static async handleNewPassword(e,{ emailElem, errorElem, setErrorText, setNewPassIsSent, setNewPassEmail }) {
    const userData = {
      email_address: emailElem.current.value,
    };

    const { res, body } = await UserNewPassword.sendEmail(userData);

    if (res.status === 200) {
      setNewPassIsSent(true);
      setNewPassEmail(emailElem.current.value)
      console.log(res)
    } else if (res.status === 401 && body.code === "ER_WRONG_LOG") {
      setErrorText("La cuenta no existe.");
      errorElem.current.style.color = "rgb(251 113 133)";
    } else {
      setErrorText("Ups! Algo a salido mal");
      errorElem.current.style.color = "rgb(251 113 133)";
    }
  }
}
