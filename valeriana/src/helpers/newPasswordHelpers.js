
export class NewPasswordHelpers {

  static async handleSendPasswordEmailInApp(e, { user, setters }) {

    const { usePopUp, setIsLoading } = setters;

    setIsLoading(true);
    try {
      const { res, body } = await UserNewPassword.sendEmail(user);

      if (res.status === 200) {
        usePopUp(` Te enviamos un email para recuperar tu contraseña a: ${user.email_address}`, "success");
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
