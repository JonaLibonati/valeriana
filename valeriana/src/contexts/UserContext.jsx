import { createContext, useEffect, useRef, useState } from "react";
import { SelfUser } from "../api/selfUser";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const role = useRef('');
  const userData = useRef({});

  useEffect(() => {
    SelfUser.getAll()
      .then(({ body }) => {
        userData.current = body;
        setUserName(body.user_name);
        setFirstName(body.first_name);
        setLastName(body.last_name);
        setEmail(body.email_address);
        role.current = body.user_roleId
      })
      .catch(console.error)
  }, [])

  return (
    <UserContext.Provider
      value={{
        userData,
        userName,
        setUserName,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
