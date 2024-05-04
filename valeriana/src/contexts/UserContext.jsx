import { createContext, useEffect, useRef, useState } from "react";
import { SelfUser } from "../api/selfUser";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const userData = useRef({});
  const role = useRef('');

  const user = {
    data : userData,
    role,
    setUserName,
    setFirstName,
    setLastName,
    setEmail
  }

  useEffect(() => {
    SelfUser.getAll()
      .then(({ body }) => {
        user.setUserName(body.user_name);
        user.setFirstName(body.first_name);
        user.setLastName(body.last_name);
        user.setEmail(body.email_address);
        user.data.current = body;
        user.role.current = body.user_roleId;
      })
      .catch(console.error)
  }, [])

  return (
    <UserContext.Provider
      value={{
        userName,
        firstName,
        lastName,
        email,
        user
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
