import { createContext, useContext, useEffect, useState } from 'react';
import { usePopUpContext } from "./PopUpContext";
import { Config } from "../api/config";
import { useData } from './DataContext';
import { useEffectAfterMonting } from '../hooks/useEffectAfterMonting';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {

  const { usePopUp } = usePopUpContext();

  const { config, setConfig } = useData()

  const [configLoading, setConfigLoading] = useState(false);

  const useOnCalendarConfig = (callback) => {
    useEffectAfterMonting([config.calendar_locale, config.calendar_time_zone, config.calendar_time_zones_list], callback)
  }

  const handleSetLocale = async (locale) => {
    setConfigLoading(true);
    try {
      const config = await Config.setCalendarLocale({ calendar_locale: locale });
      setConfig(config.body);
    } catch (err) {
      usePopUp(err, "error")
    } finally {
      setConfigLoading(false);
    }
  }

  const handleSetTimeZone = async (timeZone) => {
    setConfigLoading(true);
    try {
      const config = await Config.setCalendarTimeZone({ calendar_time_zone: timeZone })
      setConfig(config.body);
    } catch (err) {
      usePopUp(err, "error")
    } finally {
      setConfigLoading(false);
    }
  }

  const handleSetTimeZoneFavorites = async (timeZoneFavorites) => {
    setConfigLoading(true);
    try {
      const config = await Config.setCalendarTimeZoneList({ calendar_time_zones_list: JSON.stringify([timeZoneFavorites]) })
      setConfig(config.body);
    } catch (err) {
      usePopUp(err, "error")
    } finally {
      setConfigLoading(false);
    }
  }

  useEffect(() => {
    console.log(config)

  }, [])
  

return (
  <ConfigContext.Provider
    value={{
      handleSetLocale,
      handleSetTimeZone,
      handleSetTimeZoneFavorites,
      configLoading,
      useOnCalendarConfig,
    }}
  >
    {children}
  </ConfigContext.Provider>
);
};

export const useConfig = () => useContext(ConfigContext);