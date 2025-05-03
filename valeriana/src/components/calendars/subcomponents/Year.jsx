import React from 'react';
import { useDate } from '../../../contexts/DateContext';

export const Year = () => {

    const { selectedDate, setYearSelector } = useDate();

    return (
        <button onClick={() => setYearSelector(true)} className='text-xl'>{selectedDate.year}</button>
    )
}