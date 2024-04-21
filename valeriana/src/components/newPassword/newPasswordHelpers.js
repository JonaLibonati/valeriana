import { validateNewPassword } from "../../schemes/userSchema";
import { UserNewPassword } from "../../api/userNewPassword";

export class NewPasswordHelpers {
  static async handleSubmit(e, { token, errorSetter, setIsPassUpdated }) {
    e.preventDefault();

    const { setErrorText, setErrorTrigger } = errorSetter;

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
          setErrorTrigger((i) => i + 1);
          arePassEqual = false;
        }
      });

      arePassEqual
        ? setErrorText("Se requieren ambos campos")
        : setErrorText("Las contraseñas no son iguales");
      setErrorTrigger((i) => i + 1);
      return;
    }

    const { res, body } = await UserNewPassword.setNewPass(userData);

    if (res.status === 200) {
      setIsPassUpdated(true);
    } else if (res.status === 401 && body.code === "ER_WRONG_LOG") {
      setErrorText("Token no es valido o ha vencido.");
      setErrorTrigger((i) => i + 1);
    } else {
      setErrorText("Ups! Algo a salido mal");
      setErrorTrigger((i) => i + 1);
    }

    console.log(res);
    console.log(body);
  }
}
