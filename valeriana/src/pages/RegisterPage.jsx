import { Register } from "../components/register/Register"
import { UserProvider } from "../contexts/UserContext"

export const RegisterPage = () => {
  return (
    <UserProvider>
      <Register />
    </UserProvider>
  )
}

