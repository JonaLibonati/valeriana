import { createContext, useContext, useEffect, useState } from 'react';
import { usePopUpContext } from "./PopUpContext";
import { SelfUser } from "../api/selfUser";
import { Config } from "../api/config";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const { usePopUp } = usePopUpContext();

  const [user, setUser] = useState({});
  const [config, setConfig] = useState({});
  const [firstLoading, setFirstLoading] = useState(true);
  const [configLoading, setConfigLoading] = useState(true);

  const firstFetchData = async () => {
    setFirstLoading(true);
    try {
      const [user, config] = await Promise.all([SelfUser.getAll(), Config.getConfig()])

      setUser(user.body);
      setConfig(config.body);

      console.log('hola desde first Fetch')
      console.log(user.body)
      console.log(config.body)

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
      usePopUp(err, "error")
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