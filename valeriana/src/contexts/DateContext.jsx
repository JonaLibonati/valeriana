
import { createContext, useRef, useState, useEffect } from "react";
import { Temporal } from 'temporal-polyfill';

export const DateContext = createContext(null);

export const DateProvider = ({children}) => {

    const selectedDate = useRef (Temporal.Now.zonedDateTimeISO()); // creates a new date object with the current date and time
    const currentDate = Temporal.Now.zonedDateTimeISO(); // creates a new date object with the current date and time

    const [daysInSelectedMonth, setDaysSelectedMonth] = useState([]);

    const [daysInSelectedYear, setDaysInSelectedYear] = useState([]);

    const [dateTrigger, setDateTrigger] = useState();

    const [hour, setHour] = useState([]);

    const [monthTrigger, setMonthTrigger] = useState();
    const [monthSelector, setMonthSelector] = useState(false);

    const [yearTrigger, setYearTrigger] = useState();
    const [yearSelector, setYearSelector] = useState(false);

    const getMonthDays = (monthNum, yearNum) => {

        let array = [];

        let firstDaysMonth = Temporal.PlainDate.from({year:yearNum, month:monthNum, day:1})

        for (let i=firstDaysMonth.dayOfWeek; i > 0; i--) {
            array.push('')
        }

        for (let i=1; i <= firstDaysMonth.daysInMonth; i++) {
            array.push(i)
        }

        return array
    }

    const getYearDays = (yearNum) => {
        let array = [];

        for (let i=1; i <= 12;i++) {
            array.push(getMonthDays(i, yearNum))
        }
        return array
    }

    useEffect(() => {
        setDaysSelectedMonth(getMonthDays(selectedDate.current.month, selectedDate.current.year));
        setDaysInSelectedYear(getYearDays(selectedDate.current.year));
    }, [dateTrigger]);

    return (
        <DateContext.Provider value={{
            selectedDate,
            currentDate,
            daysInSelectedMonth,
            daysInSelectedYear,
            hour,
            setHour,
            monthTrigger,
            setMonthTrigger,
            yearTrigger,
            setYearTrigger,
            dateTrigger,
            setDateTrigger,
            monthSelector,
            setMonthSelector,
            yearSelector,
            setYearSelector,
        }}>
            {children}
        </DateContext.Provider>
    );
}
