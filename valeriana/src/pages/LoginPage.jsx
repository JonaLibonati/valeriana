import React, { useState } from "react";
import { LoginForm } from "../components/login/LoginForm";

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
        <EmailSentMessage handleGoBack={handleGoBack} email={newPassEmail}/>
      )}
    </>
  );
};
