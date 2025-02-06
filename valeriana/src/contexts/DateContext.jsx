
import { createContext, useRef, useState, useEffect } from "react";

export const DateContext = createContext(null);

export const DateProvider = ({children}) => {

    const selectedDate = useRef (new Date()); // creates a new date object with the current date and time
    const currentDate = new Date(); // creates a new date object with the current date and time

    const firstDate = new Date(); // get the first day of the month
    const lastDate = new Date(); // get the last date of the month

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

        firstDate.setFullYear(yearNum, monthNum, 1);

        lastDate.setFullYear(yearNum, monthNum+1, 0);

        for (let i=firstDate.getDay(); i > 0; i--) {
            array.push('')
        }

        for (let i=1; i <= lastDate.getDate(); i++) {
            array.push(i)
        }

        return array
    }

    const getYearDays = (yearNum) => {
        let array = [];

        for (let i=0; i <= 11;i++) {
            console.log(i)
            array.push(getMonthDays(i, yearNum))
        }
        return array
    }

    useEffect(() => {
        setDaysSelectedMonth(getMonthDays(selectedDate.current.getMonth(), selectedDate.current.getFullYear()));
        setDaysInSelectedYear(getYearDays(selectedDate.current.getFullYear()));
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
