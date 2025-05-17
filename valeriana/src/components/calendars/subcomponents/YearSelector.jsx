import React from 'react'
import { useDate } from '../../../contexts/DateContext'

export const YearSelector = ({className}) => {

    const { selectedDateRef, selectedDate, setYearSelector, useUpdateSelectedDate } = useDate()

    const handleClickAdd = () => {
        const date = selectedDateRef.current.add({years: 1});
        useUpdateSelectedDate(date);
    }

    const handleClickSubtract = () => {
        const date = selectedDateRef.current.subtract({years: 1});
        useUpdateSelectedDate(date)
    }

    return (
        <div className={`pt-2 pb-2 flex size-full ${className || ''}`}>
            <button className='flex-auto pl-4 pr-2' onClick={() => handleClickSubtract()}>{'<'}</button>
            <button className='flex-none pl-2 pr-2' onClick={() => setYearSelector(false)}>{selectedDate.year}</button>
            <button className='flex-auto pl-2 pr-4'onClick={() => handleClickAdd()}>{'>'}</button>
        </div>
    )
}
