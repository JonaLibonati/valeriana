import { createContext, useState, useEffect } from "react";
import { ContactPsychologist } from "../api/contact";


export const PsychologistContext = createContext(null);

export const PsychologistProvider = ({ children }) => {

  const [myPsychologists, setMyPsychologists] = useState([]);

  class PsychologistHelpers {
    static async handleContact (e, psychologistData) {
      console.log(psychologistData);
      ContactPsychologist.create(psychologistData)
        .then(({ res, body }) => {
          if (res.status === 201) setMyPsychologists(body);
          else console.error(res);
        })
        .catch((e) => console.error(e));
    };

    static async handleDelete (e) {
      ContactPsychologist.delete()
        .then(({ res, body }) => {
          if (res.status === 201) setMyPsychologists(body);
          else console.error(res);
        })
        .catch((e) => console.error(e));
    };
  }

  useEffect(() => {
    ContactPsychologist.getContactList().then(({ res, body }) => {
      console.log(body)
      if (res.status === 200) setMyPsychologists(body);
      else console.error(res);
    });
  }, []);

  return (
    <PsychologistContext.Provider value={{
      myPsychologists,
      setMyPsychologists,
      PsychologistHelpers
    }}>
      {children}
    </PsychologistContext.Provider>
  );
};
