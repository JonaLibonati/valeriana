import React, { useEffect, useRef } from 'react'
import { useDate } from '../../../contexts/DateContext';
import { Temporal } from 'temporal-polyfill';

export const DateNumber = ({ text, font, day, month, year, timeZone, ij }) => {
    const { selectedDateRef, selectedDate, setSelectedDate, currentDate, currentDateRef } = useDate();

    const div = useRef(null);
    const initialDay = useRef(day);

    const handleClick = () => {
      if (text != "") {
        div.current.classList.add('bg-primary-base')
        selectedDateRef.current = Temporal.ZonedDateTime.from({year, month, day, timeZone});
        setSelectedDate(selectedDateRef.current)
      }
    }

    useEffect(() => {
      if (selectedDateRef.current.day != day || selectedDateRef.current.month != month || selectedDateRef.current.year != year ) {
        div.current.classList.remove('bg-primary-base')}

      if (currentDateRef.current.day === initialDay.current && currentDateRef.current.month === month && currentDateRef.current.year === year) {
        div.current.classList.remove('bg-primary-base');
        div.current.classList.add('bg-secondary-light');
      } else {
        div.current.classList.remove('bg-secondary-light');
      }

    }, [selectedDate, currentDate])

    useEffect(() => {
      div.current.classList.remove('bg-primary-base')
    }, [selectedDate.year, selectedDate.month])

  return (
    <div ref={div} className={`size-9 flex justify-items-center items-center rounded-3xl ${font == undefined? '': font}`}>
        <button className='w-full text-center align-middle' onClick={handleClick}>{text}</button>
    </div>
  )
}
