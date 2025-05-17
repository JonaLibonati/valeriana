import { createContext, useState, useEffect, useContext } from "react";
import { ContactPatient } from "../api/contact";
import { useData } from "./DataContext";

export const PsychologistContext = createContext(null);

export const PsychologistProvider = ({ children }) => {

  const { user, contacts } = useData();

    const [myPatients, setMyPatients] = useState([]);
    const [myRequests, setMyRequests] = useState([]);

    const filterContactList = (contacts) => {
      if (contacts.length !== 0) {
        let patients = [];
        let requests = [];
        contacts.map((contact) => {
          if (contact.isAccepted) {
            patients.push(contact);
          } else {
            requests.push(contact);
          }
        });
        console.log(patients)
        setMyPatients(patients);
        setMyRequests(requests);
      }
    }

    const handleDeletePatient = async (e, patientData) => {
      ContactPatient.delete(patientData)
        .then(({ res, body }) => {
          if (res.status === 201) {
            filterContactList(body);
          }
          else console.error(res);
        })
        .catch((e) => console.error(e));
    }

    const handleAcceptPatient = async (e, patientData) => {
      ContactPatient.accept(patientData)
        .then(({ res, body }) => {
          if (res.status === 201) {
            filterContactList(body);
          }
          else console.error(res);
        })
        .catch((e) => console.error(e));
    }

    /* const findPatientByID = (patient_id) => {
      let result = ""
      myPatients.map( (patient) => {
        if (patient.user_id == patient_id) {
          result = patient
        }
      } )
      return result
    } */

    useEffect(() => {
      filterContactList(contacts);
    }, []);

  return (
    <PsychologistContext.Provider value={{
      myPatients,
      myRequests,
      handleDeletePatient,
      handleAcceptPatient,
    }}>
      {user.role_name === "psychologist" ?
        <>{children}</> :
        <></>
      }
    </PsychologistContext.Provider>
  );
};

export const usePsychologist = () => useContext(PsychologistContext);

