import React, { useContext, useState } from 'react'
import { DateContext } from '../../../contexts/DateContext'

export const YearSeletor = ({className}) => {

    const { selectedDate, setYearSelector, setDateTrigger, setYearTrigger } = useContext(DateContext)

    const handleClickAdd = () => {
        selectedDate.current.setFullYear(selectedDate.current.getFullYear() + 1);
        setYear(selectedDate.current.getFullYear())
        setDateTrigger(selectedDate.current.getFullYear())
        setYearTrigger(selectedDate.current.getFullYear())
    }

    const handleClickSubtract = () => {
        selectedDate.current.setFullYear(selectedDate.current.getFullYear() - 1);
        setYear(selectedDate.current.getFullYear())
        setDateTrigger(selectedDate.current.getFullYear())
        setYearTrigger(selectedDate.current.getFullYear())
    }

    const [year, setYear] = useState(selectedDate.current.getFullYear());

    return (
        <div className={`flex size-full text-2xl ${className}`}>
            <button className='flex-auto ' onClick={() => handleClickSubtract()}>{'<'}</button>
            <button className='flex-none pl-3 pr-3' onClick={() => setYearSelector(false)}>{year}</button>
            <button className='flex-auto'onClick={() => handleClickAdd()}>{'>'}</button>
        </div>
    )
}
