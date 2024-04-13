import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ValidatePage } from "./pages/ValidatePage";
import { ValidateEmailPage } from "./pages/ValidateEmailPage";
import { NewPasswordPage } from "./pages/NewPasswordPage";
import { WelcomeDashboard } from "./components/welcomeDashboard/WelcomeDashboard";
import { UserDashboard } from "./components/userDashboard/UserDashboard";
import "./poppins.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <WelcomeDashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "validate/:user_id",
        element: <ValidateEmailPage />
      },
      {
        path: "validate/",
        element: <ValidatePage />
      },
      {
        path: "password/:token",
        element: <NewPasswordPage />
      }
    ],
  },
  {
    path: '/app/user',
    element: <UserDashboard />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
