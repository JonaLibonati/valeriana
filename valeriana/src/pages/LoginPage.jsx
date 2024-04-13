import React from 'react';
import { LoginForm } from '../components/login/LoginForm';
import { UserProvider } from '../contexts/UserContext';


export const LoginPage = () => {
  return (
    <UserProvider>
      <LoginForm />
    </UserProvider>
  )
}
