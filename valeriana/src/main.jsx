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
import { PopUpProvider } from "./contexts/PopUpContext";
import { UserProvider } from "./contexts/UserContext";
import { TimeProvider } from "./contexts/TimeContext";
import { DateProvider } from "./contexts/DateContext";
import { HomePage } from "./pages/HomePage";
import { PsychologistPage } from "./pages/PsychologistPage";
import { PatientsPage } from "./pages/PatientsPage";
import { PsychologistProvider } from "./contexts/PsychologistContext";
import { PatientProvider } from "./contexts/PatientContext";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { Google } from "./pages/Google";

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
    element: <TimeProvider><UserProvider><UserDashboard /></UserProvider></TimeProvider>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PatientProvider><PsychologistProvider><HomePage/></PsychologistProvider></PatientProvider>,
      },
      {
        path: "home",
        element: <PatientProvider><PsychologistProvider><HomePage/></PsychologistProvider></PatientProvider>,
      },
      {
        path: "appointments",
        element: <DateProvider><PatientProvider><PsychologistProvider><AppointmentsPage/></PsychologistProvider></PatientProvider></DateProvider>,
      },
      {
        path: "patients",
        element: <PatientProvider><PatientsPage /></PatientProvider>,
      },
      {
        path: "psychologist",
        element: <PsychologistProvider><PsychologistPage /></PsychologistProvider>,
      },
      {
        path: "mydata",
        element: <MydataPage />,
      },
      {
        path: "config",
        element: <ConfigPage />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <PopUpProvider>
        <RouterProvider router={router} />
      </PopUpProvider>
    </ThemeProvider>
  </React.StrictMode>
);
