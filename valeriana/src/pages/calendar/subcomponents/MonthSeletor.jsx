import React, { useContext } from 'react'
import { DateContext } from '../../../contexts/DateContext'

export const MonthSeletor = () => {

    const { selectedDate, monthNames, monthAbbr, setMonth, setMonthSelector } = useContext(DateContext)

    const handleClick = (i) => {
        setMonth(monthNames[i]);
        selectedDate.current.setMonth(i);
        setMonthSelector(false);
    }

    return (
        <div className='absolute flex size-full bg-rose-50'>
            <div className='grid grid-cols-3 grid-row-3 gap-2 justify-items-center items-center basis-full'>
                { monthAbbr.map( (text, i) => <button onClick={() => handleClick(i)}>{text}</button> ) }
            </div>
        </div>
    )
}
