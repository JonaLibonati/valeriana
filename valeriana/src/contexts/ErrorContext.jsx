
import { createContext, useState } from "react";
import { ErrorPopUp } from "../components/globalComponents/popups/ErrorPopUp";

export const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {

  const [errorPopUp, setErrorPopUp] = useState(false);
  const [errorText, setErrorText] = useState('Error message');

  return (
    <ErrorContext.Provider
      value={{
        setErrorPopUp,
        setErrorText
      }}
    >
      { errorPopUp?  <ErrorPopUp errorMessage={errorText} setErrorPopUp={setErrorPopUp} /> : <></>}
      {children}
    </ErrorContext.Provider>
  );
};
