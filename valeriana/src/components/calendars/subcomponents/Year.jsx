import React, { useContext } from 'react';
import { DateContext } from '../../../contexts/DateContext';

export const Year = () => {

    const { selectedDate, setYearSelector } = useContext(DateContext);

    return (
        <button onClick={() => setYearSelector(true)} className='text-xl'>{`${selectedDate.current.getFullYear()}.`}</button>
    )
}