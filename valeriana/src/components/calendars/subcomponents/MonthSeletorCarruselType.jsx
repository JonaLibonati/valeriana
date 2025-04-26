import React, { useContext, useState } from 'react'
import { DateContext } from '../../../contexts/DateContext'
import { monthNames } from '../../../helpers/time'
import { Temporal } from 'temporal-polyfill'

export const MonthSeletorCarruselType = ({className}) => {

    const { selectedDate, setMonthSelector, setDateTrigger, setMonthTrigger } = useContext(DateContext)

        const handleClickAdd = () => {
            if(month < 12) {
                selectedDate.current = selectedDate.current.add({months: 1});
                
            } else {
                selectedDate.current = selectedDate.current.subtract({months: 11});
            }
            setDateTrigger(selectedDate.current.month)
            setMonthTrigger(selectedDate.current.month)
            setMonth(selectedDate.current.month)
        }

        const handleClickSubtract = () => {
            console.log(selectedDate.current.month)
            if (month > -1) {
                selectedDate.current = selectedDate.current.subtract({months: 1});
            } else {
                selectedDate.current = selectedDate.current.subtract({months: 11});
            }
            setDateTrigger(selectedDate.current.month)
            setMonthTrigger(selectedDate.current.month)
            setMonth(selectedDate.current.month)
        }

        const [month, setMonth] = useState(selectedDate.current.month);

    return (
        <div className={`flex size-full text-2xl ${className}`}>
            <button className='flex-auto ' onClick={() => handleClickSubtract()}>{'<'}</button>
            <button className='flex-none pl-3 pr-3' onClick={() => setMonthSelector(false)}>{monthNames[month-1]}</button>
            <button className='flex-auto'onClick={() => handleClickAdd()}>{'>'}</button>
        </div>
    )
}
