export class ContactHelpers {
    static async handleCreate(e, { setters }) {
      e.preventDefault();

      const { usePopUp, setIsLoading } = setters;

      console.log(psychologistData);
      ContactPsychologist.create(psychologistData)
        .then(({ res, body }) => {
          if (res.status === 201) setMyPsychologists(body);
          else console.error(res);
        })
        .catch((e) => console.error(e));

      setIsLoading(true);

      try {
        const { res, body } = await ContactPsychologist.create(
          psychologistData
        );

        console.log(body);

        if (res.status === 201) {
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