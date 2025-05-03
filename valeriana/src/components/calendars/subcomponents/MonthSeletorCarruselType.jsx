import React from 'react'
import { useDate } from '../../../contexts/DateContext'
import { monthNames } from '../../../helpers/time'

export const MonthSeletorCarruselType = ({className}) => {

    const { selectedDateRef, selectedDate, setSelectedDate, setMonthSelector } = useDate()

        const handleClickAdd = () => {
            if(selectedDateRef.current.month < 12) {
                selectedDateRef.current = selectedDateRef.current.add({months: 1});
                
            } else {
                selectedDateRef.current = selectedDateRef.current.subtract({months: 11});
            }
            setSelectedDate(selectedDateRef.current)
        }

        const handleClickSubtract = () => {
            console.log(selectedDateRef.current.month)
            if (selectedDateRef.current.month > -1) {
                selectedDateRef.current = selectedDateRef.current.subtract({months: 1});
            } else {
                selectedDateRef.current = selectedDateRef.current.subtract({months: 11});
            }
            setSelectedDate(selectedDateRef.current)
        }

    return (
        <div className={`flex size-full text-2xl ${className}`}>
            <button className='flex-auto ' onClick={() => handleClickSubtract()}>{'<'}</button>
            <button className='flex-none pl-3 pr-3' onClick={() => setMonthSelector(false)}>{monthNames[selectedDate.month-1]}</button>
            <button className='flex-auto'onClick={() => handleClickAdd()}>{'>'}</button>
        </div>
    )
}
