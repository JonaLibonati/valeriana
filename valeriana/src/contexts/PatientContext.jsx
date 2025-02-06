import { createContext, useState, useEffect, useContext } from "react";
import { ContactPatient } from "../api/contact";
import { meeting } from "../api/meeting";
import { UserContext } from "./UserContext";

export const PatientContext = createContext(null);

export const PatientProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [myPatients, setMyPatients] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [myMeetings, setMyMeetings] = useState([]);

  const filterContactList = (body) => {
    if (body.length !== 0) {
      let patients = [];
      let requests = [];
      body.map((contact) => {
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

  class PatientsHelpers {
    static async handleDelete(e, patientData) {
      ContactPatient.delete(patientData)
        .then(({ res, body }) => {
          if (res.status === 201) {
            filterContactList(body);
          }
          else console.error(res);
        })
        .catch((e) => console.error(e));
    }

    static async handleAccept(e, patientData) {
      ContactPatient.accept(patientData)
        .then(({ res, body }) => {
          if (res.status === 201) {
            filterContactList(body);
          }
          else console.error(res);
        })
        .catch((e) => console.error(e));
    }

    static async handleCreateMeeting(e, meetingData) {
      meeting.create(meetingData)
        .then(({ res, body }) => {
          if (res.status === 201) {
            setMyMeetings(body);
          }
          else console.error(res);
        })
        .catch((e) => console.error(e));
    }

    static findPatientByID(patient_id) {
      let result = ""
      myPatients.map( (patient) => {
        if (patient.user_id == patient_id) {
          result = patient
        }
      } )
      return result
    }
  }

  useEffect(() => {
    if (user.role.current == "psychologist") {
      ContactPatient.getContactList().then(({ res, body }) => {
        if (res.status === 200) {
          filterContactList(body);
        } else console.error(res);
      });

      meeting.getMeetingList().then(({ res, body }) => {
        if (res.status === 200) {
          console.log(body)
          setMyMeetings(body);
        } else console.error(res);
      });

    }
  }, [user.role.current]);

  return (
    <PatientContext.Provider
      value={{
        myPatients,
        myRequests,
        myMeetings,
        PatientsHelpers,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
