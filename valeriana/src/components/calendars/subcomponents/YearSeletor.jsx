import React from 'react'
import { useDate } from '../../../contexts/DateContext'

export const YearSeletor = ({className}) => {

    const { selectedDateRef, selectedDate, setSelectedDate, setYearSelector, setYearTrigger } = useDate()

    const handleClickAdd = () => {
        selectedDateRef.current = selectedDateRef.current.add({years: 1});
        setSelectedDate(selectedDateRef.current)
        setYearTrigger(selectedDateRef.current.year)
    }

    const handleClickSubtract = () => {
        selectedDateRef.current = selectedDateRef.current.subtract({years: 1});
        setSelectedDate(selectedDateRef.current)
        setYearTrigger(selectedDateRef.current.year)
    }

    return (
        <div className={`flex size-full text-2xl ${className}`}>
            <button className='flex-auto ' onClick={() => handleClickSubtract()}>{'<'}</button>
            <button className='flex-none pl-3 pr-3' onClick={() => setYearSelector(false)}>{selectedDate.year}</button>
            <button className='flex-auto'onClick={() => handleClickAdd()}>{'>'}</button>
        </div>
    )
}
