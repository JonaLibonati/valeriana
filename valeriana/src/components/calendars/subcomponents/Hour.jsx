import React, { useRef, useEffect, useContext, useState } from 'react'
import { DateContext } from '../../../contexts/DateContext';

export const Hour = ({ hours, minutes }) => {

    const div = useRef(null);

    const { selectedDate, hour, setHour, date, days } = useContext(DateContext);

    const handleClick = () => {
        selectedDate.current.setHours(hours, minutes, 0);
        setHour([selectedDate.current.getHours(), selectedDate.current.getMinutes()]);
    }

    useEffect(() => {
        const array1 = [selectedDate.current.getHours(), selectedDate.current.getMinutes()];
        const array2 = [hours, minutes];

        if (selectedDate.current.getHours() === hours && selectedDate.current.getMinutes() === minutes && hour.length != 0) {
            div.current.classList.add('bg-primary-base')
        }
        else {div.current.classList.remove('bg-primary-base')}
    }, [hour])

    useEffect(() => {
        div.current.classList.remove('bg-primary-base');
        setHour([])
    }, [date, days])

  return (
    <div ref={div} className={`pl-1.5 pr-1.5 h-8 flex justify-items-center items-center rounded-3xl`}>
        <button onClick={handleClick} className='w-full text-center align-middle'>{`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`}</button>
    </div>
  )
}
