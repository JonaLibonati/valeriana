import React, { useContext, useState } from 'react'
import { DateContext } from '../../../contexts/DateContext'
import { monthNames } from '../../../helpers/time'

export const MonthSeletorCarruselType = ({className}) => {

    const { selectedDate, setMonthSelector, setDateTrigger, setMonthTrigger } = useContext(DateContext)

        const handleClickAdd = () => {
            if(month + 1 < 12) {
                selectedDate.current.setMonth(selectedDate.current.getMonth() + 1);
                setMonth(selectedDate.current.getMonth())
                setDateTrigger(selectedDate.current.getMonth())
                setMonthTrigger(selectedDate.current.getMonth())
            } else {
                selectedDate.current.setMonth(0);
                setMonth(0)
                setDateTrigger(0)
                setMonthTrigger(0)
            }
        }

        const handleClickSubtract = () => {
            console.log(selectedDate.current.getMonth())
            if (month - 1 > -1) {
                selectedDate.current.setMonth(selectedDate.current.getMonth() - 1);
                setMonth(selectedDate.current.getMonth())
                setDateTrigger(selectedDate.current.getMonth())
                setMonthTrigger(selectedDate.current.getMonth())
            } else {
                selectedDate.current.setMonth(11);
                setMonth(11)
                setDateTrigger(11)
                setMonthTrigger(11)
            }
        }

        const [month, setMonth] = useState(selectedDate.current.getMonth());

    return (
        <div className={`flex size-full text-2xl ${className}`}>
            <button className='flex-auto ' onClick={() => handleClickSubtract()}>{'<'}</button>
            <button className='flex-none pl-3 pr-3' onClick={() => setMonthSelector(false)}>{monthNames[month]}</button>
            <button className='flex-auto'onClick={() => handleClickAdd()}>{'>'}</button>
        </div>
    )
}
