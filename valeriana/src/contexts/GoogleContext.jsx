import { Google } from '../api/google';
import { usePopUpContext } from './PopUpContext';
import { createContext, useContext, useEffect, useState } from 'react';

const GoogleContext = createContext();

export const GoogleProvider = ({ children }) => {

  const { usePopUp } = usePopUpContext();

  const [calendarId, setCalendarId] = useState('');
  const [isGoogleSync, setIsGoogleSync] = useState(false);

  const [createCalendarRes, setCreateCalendarRes] = useState('');
  const [syncResult, setSyncResult] = useState('');

  const [isSyncSuccessful, setIsSyncSuccessful] = useState(false);
  const [isCalendarSuccessful, setIsCalendarSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncLoading, setIsSyncLoading] = useState(false);
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);

  const checkGoogleSync = async () => {
    setIsLoading(true)
    try {
      const { body } = await Google.getCalendar();

      console.log(body)

      if (body.code === "GOOGLE_CALENDAR_FOUND_AND_GRANTED") {
        setCalendarId(body.data.id);
        setIsGoogleSync(true);
        setGoogleCalendarIsSyncInDataBase({google_calendar_is_sync: 1})
      } else {
        setGoogleCalendarIsSyncInDataBase({google_calendar_is_sync: 0})
      }
    } catch (error) {
      console.error(error)
      usePopUp(error, "error");
    } finally {
      setIsLoading(false)
    }
  }

  const setGoogleCalendarIsSyncInDataBase = async ({google_calendar_is_sync}) => {
    try {
      const { body } = await Google.serGoogleCalendarIsSync({google_calendar_is_sync})
      console.log(body)
    } catch (error) {
      console.error(error)
      usePopUp(error, "error");
    }
  }

  useEffect(() => {
    checkGoogleSync()
  }, []);

  const handleSyncCallback = async (code, scope) => {
    setIsSyncLoading(true)

    try {
      const { res, body } = await Google.syncCallback({ code, scope })
      setSyncResult(body.code)
      if (res.status == 200 && (body.code == 'TOKENS_SAVED' || body.code == 'TOKENS_UPDATED' || body.code == 'GRANT_ALREADY_OBTAINED')) {
        console.info(body.code)
        setIsSyncSuccessful(true)
      } else {
        console.error(body.code)
        console.info(body.data)
        setIsSyncSuccessful(false)
      }
      setSyncResult(body.code)
    } catch (error) {
      console.error(error)
      usePopUp(error, "error");
    } finally {
      setIsSyncLoading(false)
    }
  };

  const handleCreateCalendar = async () => {
    setIsCalendarLoading(true)
    try {
      const { res, body } = await Google.createCalendar();
      if (res.status == 200) {
        console.info(body.code)
        setIsCalendarSuccessful(true)
      } else {
        console.error(body.code)
        setIsCalendarSuccessful(false)
      }
      setCreateCalendarRes(body.code)
    } catch (error) {
      console.error(error)
      usePopUp(error, "error");
    } finally {
      setIsCalendarLoading(false)
    }
  };

  const handleRevoke = async () => {
    setIsLoading(true);
    try {
      const { body } = await Google.revokeToken();
      if (body.code === 'GOOGLE_TOKEN_REVOKED') {
        setCalendarId("");
        setIsGoogleSync(false);
      }
    } catch (error) {
      console.error(error)
      usePopUp(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncCalendar = async () => {
    setIsLoading(true);
    try {
      const { body } = await Google.syncCalendar();
      window.open(body.oauthUrl, '_blank').focus();

    } catch (error) {
      console.error(error)
      usePopUp(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleContext.Provider
      value={{
        calendarId,
        isGoogleSync,
        handleRevoke,
        handleSyncCalendar,
        handleSyncCallback,
        handleCreateCalendar,
        createCalendarRes,
        syncResult,
        isSyncSuccessful,
        isCalendarSuccessful,
        isLoading,
        isSyncLoading,
        isCalendarLoading,
      }}
    >
      {children}
    </GoogleContext.Provider>
  );
};

export const useGoogle = () => useContext(GoogleContext);