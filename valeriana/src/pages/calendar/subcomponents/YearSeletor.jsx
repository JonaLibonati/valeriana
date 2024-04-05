import React, { useContext } from 'react'
import { DateContext } from '../../../contexts/DateContext'

export const YearSeletor = () => {

    const { selectedDate, year, setYear, setYearSelector } = useContext(DateContext)

    const handleClickAdd = () => {
        selectedDate.current.setFullYear(year + 1);
        setYear(selectedDate.current.getFullYear());
    }

    const handleClickSubtract = () => {
        selectedDate.current.setFullYear(year - 1);
        setYear(selectedDate.current.getFullYear());
    }

    return (
        <div className='absolute flex size-full bg-rose-50 text-2xl'>
            <button className='flex-auto ' onClick={() => handleClickSubtract()}>{'<'}</button>
            <button className='flex-none pl-3 pr-3' onClick={() => setYearSelector(false)}>{year}</button>
            <button className='flex-auto'onClick={() => handleClickAdd()}>{'>'}</button>
        </div>
    )
}
