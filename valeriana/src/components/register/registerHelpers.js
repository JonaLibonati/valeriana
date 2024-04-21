import { validateAllUser } from "../../schemes/userSchema";
import { userCreate } from "../../api/userCreate";

export class RegisterHelpers {
  static async handleSubmit(e, { userData, setters }) {
    e.preventDefault();

    const { setErrorText, setErrorTrigger, setIsLoading, setUserIsCreated } =
      setters;

    let user = {
      ...userData,
      first_name: e.target[0].value == "" ? undefined : e.target[0].value,
      last_name: e.target[1].value == "" ? undefined : e.target[1].value,
      user_name: e.target[2].value == "" ? undefined : e.target[2].value,
      email_address: e.target[3].value == "" ? undefined : e.target[3].value,
      confirm_email: e.target[4].value == "" ? undefined : e.target[4].value,
      user_password: e.target[5].value == "" ? undefined : e.target[5].value,
      confirm_password: e.target[6].value == "" ? undefined : e.target[6].value,
    };

    console.log(user);

    user = validateAllUser(user);

    if (!user.success) {
      console.log(user.error.issues);
      const message = user.error.issues[0].message;

      message === "Required"
        ? setErrorText("Todos los campos son requeridos")
        : setErrorText(message);
      setErrorTrigger((i) => i + 1);
      return;
    }

    setIsLoading(true);

    try {
      const { res, body } = await userCreate(user.data);
      if (res.status === 201) {
        console.log(body);
        setUserIsCreated(true);
      } else {
        if (res.status === 400 && body.code === "ER_DUP_ENTRY_USER_NAME") {
          setErrorText("El nombre de usuario ya esta en uso");
        } else if (res.status === 400 && body.code === "ER_DUP_ENTRY_EMAIL") {
          setErrorText("El email ya esta en uso");
        } else {
          setErrorText("Ups! Algo a salido mal");
        }
        setErrorTrigger((i) => i + 1);
      }
      setIsLoading(false);
    } catch {
      console.error(e);
      setIsLoading(false);
    }
  }

  static inputList = [
    {
      name: "first_name",
      type: "text",
      placeholder: "Nombre",
      maxlength: 30,
    },
    {
      name: "last_name",
      type: "text",
      placeholder: "Apellido",
      maxlength: 30,
    },
    {
      name: "user_name",
      type: "text",
      placeholder: "Nombre de Usuario",
      maxlength: 20,
    },
    {
      name: "email_address",
      type: "email",
      placeholder: "eMail",
    },
    {
      name: "confirm_email",
      type: "email",
      placeholder: "Confirmar eMail",
    },
    {
      name: "user_password",
      type: "password",
      placeholder: "Contraseña",
    },
    {
      name: "confirm_password",
      type: "password",
      placeholder: "Confirmar contraseña",
      autocomplete: "off",
    },
  ];
}
