import { createContext, useState, useEffect } from "react";
import { ContactPatient } from "../api/contact";
import { meeting } from "../api/meeting";
import { useData } from "./DataContext";

export const PatientContext = createContext(null);

export const PatientProvider = ({ children }) => {
  const { user } = useData();

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

    static async handleCreateMeeting(meetingData) {
      meeting.create(meetingData)
        .then(({ res, body }) => {
          if (res.status === 201) {
            setMyMeetings(body.meetingsList);
          }
          else console.error(res, body);
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
    if (user.role_name == "psychologist") {
      ContactPatient.getContactList().then(({ res, body }) => {
        if (res.status === 200) {
          filterContactList(body);
        } else console.error(res);
      });

      meeting.getMeetingList().then(({ res, body }) => {
        if (res.status === 200) {
          console.log(body)
          setMyMeetings(body.meetingsList);
        } else console.error(res);
      });

    }
  }, []);

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
