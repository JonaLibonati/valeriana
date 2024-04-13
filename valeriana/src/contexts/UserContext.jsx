import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // LoginData example
  // {
  //     user_email,
  //     user_password
  // }

  const [userData, setUserData] = useState({});

  const handleOnChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setUserData((userElem) => ({ ...userElem, [name]: value }));

    console.log(userData);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        handleOnChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
