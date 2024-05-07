
import { createContext, useEffect, useState } from "react";
import { updateTime } from "../helpers/time";

export const TimeContext = createContext(null);

export const TimeProvider = ({ children }) => {

  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    updateTime({ setDate, setDay, setMonth, setHours, setMinutes });
  }, [])

  return (
    <TimeContext.Provider
      value={{
        date,
        day,
        month,
        hours,
        minutes
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};
