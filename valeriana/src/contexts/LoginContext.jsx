import { createContext, useRef, useState, useEffect } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  // LoginData example
  // {
  //     user_email,
  //     user_password
  // }

  const [loginData, setLoginData] = useState({});

  return (
    <LoginContext.Provider
      value={{
        loginData,
        setLoginData,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
