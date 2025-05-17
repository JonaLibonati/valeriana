import { createContext, useContext, useEffect, useState } from 'react';
import { ContactPatient, ContactPsychologist } from '../api/contact';
import { usePopUpContext } from "./PopUpContext";
import { User } from "../api/user";
import { Config } from "../api/config";
import { Meeting } from '../api/meeting';
import { Google } from '../api/google';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { usePopUp } = usePopUpContext();

  const [user, setUser] = useState({});
  const [config, setConfig] = useState({});
  const [contacts, setContacts] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const [configLoading, setConfigLoading] = useState(true);

  const firstFetchData = async () => {
    setFirstLoading(true);
    try {
      const [user, config, meetings] = await Promise.all([User.getAll(), Config.getConfig(), Meeting.getMeetingList(), Google.getCalendar()]);

      setUser(user.body);
      setConfig(config.body);
      setMeetings(meetings.body);

      console.log('hola desde first Fetch');
      console.log(user.body);
      console.log(config.body);
      console.log(meetings.body);

      let contacts = [];

      if (user.body.role_name == 'patient') {
        contacts = await ContactPsychologist.getContactList();
        setContacts(contacts.body);
      } else if (user.body.role_name == 'psychologist') {
        contacts = await ContactPatient.getContactList()
      }

      setContacts(contacts.body);
      console.log(contacts.body);

    } catch (err) {
      usePopUp(err, "error")
    } finally {
      setFirstLoading(false);
    }
  };

  const fetchConfig = async () => {
    setConfigLoading(true);
    try {
      const config = await Config.getConfig();

      setConfig(config.body);
    } catch (err) {
      usePopUp(err, "error");
    } finally {
      setConfigLoading(false);
    }
  };

  useEffect(() => {
    firstFetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        config,
        setConfig,
        contacts,
        setContacts,
        meetings,
        setMeetings,
        firstLoading,
        configLoading,
        refetchAll: firstFetchData,
        refetchConfig: fetchConfig,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);