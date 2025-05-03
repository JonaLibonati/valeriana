
import { createContext, useRef, useState, useEffect, useContext } from "react";
import { Temporal } from 'temporal-polyfill';
import { useData } from "./DataContext";

export const DateContext = createContext(null);

export const DateProvider = ({children}) => {

    const { config } = useData();

    const selectedDateRef = useRef (Temporal.Now.zonedDateTimeISO(config.calendar_time_zone || Temporal.Now.timeZoneId())); // creates a new date object with the current date and time
    const [selectedDate, setSelectedDate] = useState(Temporal.Now.zonedDateTimeISO(config.calendar_time_zone || Temporal.Now.timeZoneId()));
    
    const currentDateRef = useRef (Temporal.Now.zonedDateTimeISO(config.calendar_time_zone || Temporal.Now.timeZoneId())); // creates a new date object with the current date and time
    const [currentDate, setCurrentDate] = useState(Temporal.Now.zonedDateTimeISO(config.calendar_time_zone || Temporal.Now.timeZoneId()));

    const [daysInSelectedMonth, setDaysSelectedMonth] = useState([]);

    const [daysInSelectedYear, setDaysInSelectedYear] = useState([]);

    const [monthSelector, setMonthSelector] = useState(false);
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
        setDaysSelectedMonth(getMonthDays(selectedDateRef.current.month, selectedDateRef.current.year));
        setDaysInSelectedYear(getYearDays(selectedDateRef.current.year));
    }, [selectedDate]);

    return (
        <DateContext.Provider value={{
            selectedDateRef,
            selectedDate,
            setSelectedDate,
            currentDateRef,
            currentDate,
            setCurrentDate,
            daysInSelectedMonth,
            daysInSelectedYear,
            monthSelector,
            setMonthSelector,
            yearSelector,
            setYearSelector,
        }}>
            {children}
        </DateContext.Provider>
    );
}

export const useDate = () => useContext(DateContext);
