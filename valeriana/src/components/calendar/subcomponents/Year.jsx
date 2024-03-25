import React, { useContext } from 'react';
import { DateContext } from '../../../contexts/DateContext';

export const Year = () => {

    const { year, setYearSelector } = useContext(DateContext);

    return (
        <button onClick={() => setYearSelector(true)} className='text-xl'>{`${year}.`}</button>
    )
}