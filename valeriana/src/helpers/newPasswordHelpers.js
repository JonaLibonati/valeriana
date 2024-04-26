import { validateNewPassword } from "../schemes/userSchema";
import { UserNewPassword } from "../api/userNewPassword";

export class NewPasswordHelpers {
  static async handleSubmit(e, { token, setters }) {
    e.preventDefault();

    const { setErrorText, setErrorPopUp, setIsPassUpdated, setIsLoading } = setters;

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
          setErrorText("Las contraseñas no son iguales");
          setErrorPopUp(true);
          arePassEqual = false;
        }
      });

      arePassEqual
        ? setErrorText("Se requieren ambos campos")
        : setErrorText("Las contraseñas no son iguales");
      setErrorPopUp(true);
      return;
    }

    setIsLoading(true);

    try {
      const { res, body } = await UserNewPassword.setNewPass(userData);

      if (res.status === 200) {
        setIsPassUpdated(true);
      } else if (res.status === 401 && body.code === "ER_WRONG_LOG") {
        setErrorText("Token no es valido o ha vencido.");
        setErrorPopUp(true);
      } else {
        setErrorText("Ups! Algo a salido mal");
        setErrorPopUp(true);
      }
      console.log(res);
      console.log(body);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }

  static async handleSendPasswordEmail(e, { emailElem, setters }) {

    const { setErrorText, setErrorPopUp, setIsLoading, setNewPassIsSent } = setters;

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
          setErrorText("La cuenta no existe.");
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
}
