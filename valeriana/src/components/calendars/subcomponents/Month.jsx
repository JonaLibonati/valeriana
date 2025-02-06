import React, { useContext } from 'react'
import { DateContext } from '../../../contexts/DateContext';

export const Month = () => {

    const { monthNames , selectedDate, setMonthSelector } = useContext(DateContext);

    return (
        <button onClick={() => setMonthSelector(true)} className='pl-2.5 text-xl'>{`${monthNames[selectedDate.current.getMonth()]}, `}</button>
    )
}
