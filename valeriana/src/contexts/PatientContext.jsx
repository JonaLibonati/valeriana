import { createContext, useState, useEffect, useContext } from "react";
import { ContactPsychologist } from "../api/contact";
import { useData } from "./DataContext";

export const PatientContext = createContext(null);

export const PatientProvider = ({ children }) => {
    const { user } = useData();

    const [isLoading, setIsLoading] = useState([]);
  
    class PsychologistHelpers {
      static async handleContact (e, psychologistData) {
        /* console.log(psychologistData);
        ContactPsychologist.create(psychologistData)
          .then(({ res, body }) => {
            if (res.status === 201) setMyPsychologist(body);
            else console.error(res);
          })
          .catch((e) => console.error(e)); */
      };
  
      static async handleDelete (e) {
       /*  ContactPsychologist.delete()
          .then(({ res, body }) => {
            if (res.status === 201) setMyPsychologist(body);
            else console.error(res);
          })
          .catch((e) => console.error(e)); */
      };
    }
  
    /* useEffect(() => {
      if ( user.role_name == 'patient') {
        ContactPsychologist.getContactList().then(({ res, body }) => {
          console.log(body)
          if (res.status === 200) setMyPsychologist(body);
          else console.error(res);
        });
      }
    }, []); */

  return (
    <PatientContext.Provider
      value={{
        isLoading,
        PsychologistHelpers,
      }}
    >
      {user.role_name === "patient" ?
        <>{children}</> :
        <></>
      }
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
