import { userLogin } from "../../api/userLogin";
import { UserNewPassword } from "../../api/userNewPassword";

export class LoginHelpers {
  static async handleSubmit(e, { setters }) {
    e.preventDefault();

    const { setErrorText, setErrorTrigger, setIsLoading } = setters;

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
          setErrorText("eMail o contraseña incorrectas");
        } else {
          setErrorText("Ups! Algo a salido mal");
        }
        setErrorTrigger((i) => i + 1);
      }

      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  static async handleNewPassword(e, { emailElem, setters }) {
    const { setErrorText, setErrorTrigger, setNewPassIsSent, setIsLoading } =
      setters;

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
        setErrorTrigger((i) => i + 1);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }
}
