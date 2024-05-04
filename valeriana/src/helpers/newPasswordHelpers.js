import { validateNewPassword } from "../schemes/userSchema";
import { UserNewPassword } from "../api/userNewPassword";

export class NewPasswordHelpers {
  static async handleSubmit(e, { token, setters }) {
    e.preventDefault();

    const { usePopUp, setIsPassUpdated, setIsLoading } = setters;

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
      const { res, body } = await UserNewPassword.setNewPass(userData);

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

  static async handleSendPasswordEmail(e, { emailElem, setters }) {

    const { usePopUp, setIsLoading, setNewPassIsSent } = setters;

    const userData = {
      email_address:
        emailElem.current.value == "" ? undefined : emailElem.current.value,
    };

    console.log(userData)

    setIsLoading(true);

    try {
      const { res, body } = await UserNewPassword.sendEmail(userData);

      if (res.status === 200) {
        setNewPassIsSent(true);
        console.log(res);
      } else {
        if (res.status === 401 && body.code === "ER_WRONG_LOG") {
          usePopUp("La cuenta no existe.", "error");
        } else {
          usePopUp("Ups! Algo a salido mal.", "error");
        }
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }
}
