import { LoginPage } from "../pages/login/LoginPage";
import { CalendarPage } from "../pages/calendar/CalendarPage";
import { LoginProvider } from "../contexts/LoginContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const ValerianaRouter = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/login"
          element={
            <LoginProvider>
              <LoginPage />
            </LoginProvider>
          }
        />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
};
