import React, { useContext, useState } from 'react'
import { DateContext } from '../../../contexts/DateContext'

export const YearSeletor = ({className}) => {

    const { selectedDate, setYearSelector, setDateTrigger, setYearTrigger } = useContext(DateContext)

    const handleClickAdd = () => {
        selectedDate.current = selectedDate.current.add({years: 1});
        setYear(selectedDate.current.year)
        setDateTrigger(selectedDate.current.year)
        setYearTrigger(selectedDate.current.year)
    }

    const handleClickSubtract = () => {
        selectedDate.current = selectedDate.current.subtract({years: 1});
        setYear(selectedDate.current.year)
        setDateTrigger(selectedDate.current.year)
        setYearTrigger(selectedDate.current.year)
    }

    const [year, setYear] = useState(selectedDate.current.year);

    return (
        <div className={`flex size-full text-2xl ${className}`}>
            <button className='flex-auto ' onClick={() => handleClickSubtract()}>{'<'}</button>
            <button className='flex-none pl-3 pr-3' onClick={() => setYearSelector(false)}>{year}</button>
            <button className='flex-auto'onClick={() => handleClickAdd()}>{'>'}</button>
        </div>
    )
}
