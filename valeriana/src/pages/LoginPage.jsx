import React, { useState } from "react";
import { LoginForm } from "../components/login/LoginForm";
import { EmailSentMessage } from "../components/login/EmailSentMessage";

export const LoginPage = () => {

  const [newPassEmail, setNewPassEmail] = useState(undefined);

  const [newPassIsSent, setNewPassIsSent] = useState(false);

  return (
    <>
    {!newPassIsSent ? (
        <>
          <LoginForm setNewPassEmail={setNewPassEmail} setNewPassIsSent={setNewPassIsSent} />
        </>
      ) : (
        <EmailSentMessage handleGoBack={() => setNewPassIsSent(false)} email={newPassEmail}/>
      )}
    </>
  );
};
