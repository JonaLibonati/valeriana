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
import { ThemeProvider } from "./contexts/ThemeContext";
import "./poppins.css";
import "./sacramento.css";
import "./index.css";
import "./colorThemes.css";
import { ConfigPage } from "./pages/ConfigPage";
import { MydataPage } from "./pages/MydataPage";

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
        element: <RegisterPage />,
      },
      {
        path: "validate/:user_id",
        element: <ValidateEmailPage />,
      },
      {
        path: "validate/",
        element: <ValidatePage />,
      },
      {
        path: "password/:token",
        element: <NewPasswordPage />,
      },
    ],
  },
  {
    path: "/app/user",
    element: <UserDashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <></>,
      },
      {
        path: "appointments",
        element: <></>,
      },
      {
        path: "patients",
        element: <></>,
      },
      {
        path: "mydata",
        element: <MydataPage/>,
      },
      {
        path: "config",
        element: <ConfigPage />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
