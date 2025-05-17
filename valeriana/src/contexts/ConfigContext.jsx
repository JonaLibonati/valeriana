import { createContext, useContext, useEffect, useState } from 'react';
import { usePopUpContext } from "./PopUpContext";
import { Config } from "../api/config";
import { useData } from './DataContext';
import { useEffectAfterMonting } from '../hooks/useEffectAfterMonting';
import { useTheme } from './ThemeContext';
import { Cookies } from '../helpers/cookies';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {

  const { usePopUp } = usePopUpContext();

  const { config, setConfig } = useData();

  const { useSetTheme } = useTheme();

  const [configLoading, setConfigLoading] = useState(false);

  const useOnCalendarConfig = (callback) => {
    useEffectAfterMonting([config.calendar_locale, config.calendar_time_zone, config.calendar_time_zones_list], callback)
  }

  const handleSetTheme = async (theme) => {
    setConfigLoading(true);
    try {
      const config = await Config.setTheme({ general_theme: theme });
      setConfig(config.body);
    } catch (err) {
      usePopUp(err, "error")
    } finally {
      setConfigLoading(false);
    }
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
    // setThemeColor
    (async () => {
      if (config.general_theme) {
        console.log(config.general_theme);
        useSetTheme(config.general_theme);
      } else if (Cookies.getCookie('theme')) {
        const {res, body} = await handleSetTheme(Cookies.getCookie('theme'));
        console.log(res)
        console.log(body)
      }
    })()
  }, [])

return (
  <ConfigContext.Provider
    value={{
      handleSetTheme,
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