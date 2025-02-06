import React, { useContext } from 'react'
import { DateContext } from '../../../contexts/DateContext';

export const SeletedDate = () => {

    const { hour, date, month, year } = useContext(DateContext);

    const [hours, minutes] = hour;

    return (
        <div className='p-4 ml-2.5 text-2xl text-white'>
            <div>{`${month} ${date}, ${year}.`}</div>
            <div className='text-3xl'>{
                hours == undefined? ' ' :
                minutes == undefined? ' ' :
                `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`}
            </div>
            <button className='pt-2 pb-2'>agendar</button>
        </div>
    )
}
