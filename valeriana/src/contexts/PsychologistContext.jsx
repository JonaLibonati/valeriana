import { createContext, useState, useEffect, useContext } from "react";
import { ContactPsychologist } from "../api/contact";
import { UserContext } from "./UserContext";


export const PsychologistContext = createContext(null);

export const PsychologistProvider = ({ children }) => {

  const { user } = useContext(UserContext);

  const [myPsychologist, setMyPsychologist] = useState([]);

  class PsychologistHelpers {
    static async handleContact (e, psychologistData) {
      console.log(psychologistData);
      ContactPsychologist.create(psychologistData)
        .then(({ res, body }) => {
          if (res.status === 201) setMyPsychologist(body);
          else console.error(res);
        })
        .catch((e) => console.error(e));
    };

    static async handleDelete (e) {
      ContactPsychologist.delete()
        .then(({ res, body }) => {
          if (res.status === 201) setMyPsychologist(body);
          else console.error(res);
        })
        .catch((e) => console.error(e));
    };
  }

  useEffect(() => {
    if ( user.role.current == 'patient') {
      ContactPsychologist.getContactList().then(({ res, body }) => {
        console.log(body)
        if (res.status === 200) setMyPsychologist(body);
        else console.error(res);
      });
    }
  }, [user.role.current]);

  return (
    <PsychologistContext.Provider value={{
      myPsychologist,
      setMyPsychologist,
      PsychologistHelpers
    }}>
      {children}
    </PsychologistContext.Provider>
  );
};
