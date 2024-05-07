
import { createContext, useRef, useState, useEffect } from "react";

export const DateContext = createContext(null);

export const DateProvider = ({children}) => {

    const selectedDate = useRef(new Date()); // creates a new date object with the current date and time

    const firstDate = new Date(selectedDate.current.getFullYear(), selectedDate.current.getMonth(), 1); // get the first day of the month
    const lastDate = new Date(selectedDate.current.getFullYear(), selectedDate.current.getMonth(), 0); // get the last date of the month

    const ignore = useRef(true);

    const [days, setDays] = useState([]);

    const [date, setDate] = useState(selectedDate.current.getDate());

    const [hour, setHour] = useState([]);

    const [month, setMonth] = useState(monthNames[selectedDate.current.getMonth()]);
    const [monthSelector, setMonthSelector] = useState(false);

    const [year, setYear] = useState(selectedDate.current.getFullYear());
    const [yearSelector, setYearSelector] = useState(false);

    useEffect(() => {

        firstDate.setFullYear(selectedDate.current.getFullYear());
        firstDate.setMonth(selectedDate.current.getMonth());

        lastDate.setFullYear(selectedDate.current.getFullYear());
        lastDate.setMonth(selectedDate.current.getMonth() + 1);

        let array = [];

        if(!ignore.current) {

            for (let i=firstDate.getDay(); i > 0; i--) {
                array.push('')
            }

            for (let i=1; i <= lastDate.getDate(); i++) {
                array.push(i)
            }

            setDays (array);
        }

        ignore.current = false

    }, [month, year]);

    return (
        <DateContext.Provider value={{
            selectedDate,
            days,
            dayNames,
            dayAbbr,
            hour,
            setHour,
            date,
            setDate,
            month,
            setMonth,
            monthNames,
            monthAbbr,
            monthSelector,
            setMonthSelector,
            year,
            setYear,
            yearSelector,
            setYearSelector,
        }}>
            {children}
        </DateContext.Provider>
    );
}
