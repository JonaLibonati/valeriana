import React from "react";
import { LoginForm } from "../components/login/LoginForm";
import { EmailSentMessage } from "../components/login/EmailSentMessage";
import { useLogin } from "../contexts/LoginContext";

export const LoginPage = () => {

  const { newPassIsSent, setNewPassIsSent } = useLogin()

  return (
    <>
    {!newPassIsSent ? (
        <>
          <LoginForm />
        </>
      ) : (
        <EmailSentMessage handleGoBack={() => setNewPassIsSent(false)} />
      )}
    </>
  );
};
