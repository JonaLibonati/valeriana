import React from 'react'
import { useDate } from '../../../contexts/DateContext'
import { monthNames } from '../../../helpers/time'

export const MonthSeletorCarruselType = ({className}) => {

    const { selectedDateRef, selectedDate, setMonthSelector, useUpdateSelectedDate } = useDate()

        const handleClickAdd = () => {
            let date;
            if(selectedDateRef.current.month < 12) {
                date = selectedDateRef.current.add({months: 1});
            } else {
                date = selectedDateRef.current.subtract({months: 11});
            }
            useUpdateSelectedDate(date)
        }

        const handleClickSubtract = () => {
            let date;
            if (selectedDateRef.current.month > -1) {
                date = selectedDateRef.current.subtract({months: 1});
            } else {
                date = selectedDateRef.current.subtract({months: 11});
            }
            useUpdateSelectedDate(date)
        }

    return (
        <div className={`flex size-full ${className}`}>
            <button className='flex-auto pl-4 pr-2' onClick={() => handleClickSubtract()}>{'<'}</button>
            <button className='flex-none pl-2 pr-2' onClick={() => setMonthSelector(false)}>{monthNames[selectedDate.month-1]}</button>
            <button className='flex-auto pl-2 pr-4'onClick={() => handleClickAdd()}>{'>'}</button>
        </div>
    )
}
