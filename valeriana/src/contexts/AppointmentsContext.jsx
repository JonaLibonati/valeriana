import { createContext, useContext, useEffect, useState } from 'react';
import { usePopUpContext } from "./PopUpContext";
import { useData } from './DataContext';
import { useDate } from './DateContext';
import { Meeting } from '../api/meeting';
import { Temporal } from 'temporal-polyfill';

const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {

  const { usePopUp } = usePopUpContext();

  const { config, setMeetings } = useData();

  const { useUpdateTimeZone } = useDate();

  const [isCreateMeetingLoading, setIsCreateMeetingLoading] = useState(false);

  const [selectedCalendar, setSelectedCalendar] = useState(2);
  const [timeZone, setTimeZone] = useState(config.calendar_time_zone || Temporal.Now.zonedDateTimeISO().timeZoneId);
  const timeZoneOptions = config.calendar_time_zones_list ? [config.calendar_time_zone || timeZone, ...JSON.parse(config.calendar_time_zones_list)[0]] : [timeZone];

  useEffect(() => {
    useUpdateTimeZone(timeZone)
  }, [timeZone])

  const handleCreateMeeting = async (meetingData) => {
    setIsCreateMeetingLoading(true);
    try {
      const { body, res } = await Meeting.create(meetingData);
      console.log(body)
      console.log(res)
      if (res.status === 201) {
        setMeetings(body);
      } else {
        usePopUp(body.code, "error");
      }
    } catch (err) {
      usePopUp(err, "error");
    } finally {
      setIsCreateMeetingLoading(false);
    }
  }

  return (
    <AppointmentsContext.Provider
      value={{
        selectedCalendar,
        setSelectedCalendar,
        timeZone,
        setTimeZone,
        timeZoneOptions,
        isCreateMeetingLoading,
        handleCreateMeeting,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentsContext);