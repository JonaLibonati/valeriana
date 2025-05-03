import React, { useContext } from 'react'
import { DateContext } from '../../../contexts/DateContext';

export const Month = () => {

    const { monthNames , selectedDateRef, setMonthSelector } = useContext(DateContext);

    return (
        <button onClick={() => setMonthSelector(true)} className='pl-2.5 text-xl'>{`${monthNames[selectedDateRef.current.getMonth()]}, `}</button>
    )
}
