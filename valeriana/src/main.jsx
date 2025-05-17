import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./poppins.css";
import "./sacramento.css";
import "./index.css";
import "./colorThemes.css";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ValidatePage } from "./pages/ValidatePage";
import { ValidateEmailPage } from "./pages/ValidateEmailPage";
import { NewPasswordPage } from "./pages/NewPasswordPage";
import { WelcomeDashboard } from "./components/welcomeDashboard/WelcomeDashboard";
import { UserDashboard } from "./components/userDashboard/UserDashboard";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ConfigPage } from "./pages/ConfigPage";
import { MydataPage } from "./pages/MydataPage";
import { PopUpProvider } from "./contexts/PopUpContext";
import { UserProvider } from "./contexts/UserContext";
import { TimeProvider } from "./contexts/TimeContext";
import { DateProvider } from "./contexts/DateContext";
import { HomePage } from "./pages/HomePage";
import { MyPsychologistPage } from "./pages/MyPsychologistPage";
import { MyPatientsPage } from "./pages/MyPatientsPage";
import { PsychologistProvider } from "./contexts/PsychologistContext";
import { PatientProvider } from "./contexts/PatientContext";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { GooglePage } from "./pages/GooglePage";
import { DataProvider } from "./contexts/DataContext";
import { ConfigProvider } from "./contexts/ConfigContext";
import { LoginProvider } from "./contexts/LoginContext";
import { GoogleProvider } from "./contexts/GoogleContext";
import { AppointmentsProvider } from "./contexts/AppointmentsContext";

const router = createBrowserRouter([
  {
    path: "/app",
    element:
      <LoginProvider>
        <WelcomeDashboard />
      </LoginProvider>,
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
    element:
      <DataProvider>
        <TimeProvider>
          <UserProvider>
            <UserDashboard />
          </UserProvider>
        </TimeProvider>
      </DataProvider>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage/>,
      },
      {
        path: "home",
        element: <HomePage/>,
      },
      {
        path: "appointments",
        element:
          <GoogleProvider>
            <DateProvider>
              <AppointmentsProvider>
                <AppointmentsPage/>
              </AppointmentsProvider>
            </DateProvider>
          </GoogleProvider>,
      },
      {
        path: "patients",
        element: <PsychologistProvider><MyPatientsPage /></PsychologistProvider>,
      },
      {
        path: "psychologist",
        element: <PatientProvider><MyPsychologistPage /></PatientProvider>,
      },
      {
        path: "mydata",
        element: <UserProvider><MydataPage /></UserProvider>,
      },
      {
        path: "config",
        element: <ConfigProvider><ConfigPage /></ConfigProvider>,
      },
    ]
  },
  {
    path: "/google/oauthcallback",
    element: <GoogleProvider><GooglePage /></GoogleProvider>,
    errorElement: <ErrorPage />,
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
