import React, { useContext, useEffect, useRef, useState } from 'react'
import { DateContext } from '../../../contexts/DateContext';
import { Temporal } from 'temporal-polyfill';

export const DateNumber = ({ text, font, day, month, year, ij }) => {
    const { selectedDate, currentDate, yearTrigger, dateTrigger, setDateTrigger } = useContext(DateContext);

    const div = useRef(null);
    const initialDay = useRef(day);

    const handleClick = () => {
      if (text != "") {
        div.current.classList.add('bg-primary-base')
        setDateTrigger(selectedDate.current.day)
        selectedDate.current = Temporal.ZonedDateTime.from({year: year, month: month, day: day, timeZone: Temporal.Now.zonedDateTimeISO().timeZoneId});
        setDateTrigger(selectedDate.current.day)
      }
    }

    useEffect(() => {
      if (selectedDate.current.day != day || selectedDate.current.month != month || selectedDate.current.year != year ) {
        div.current.classList.remove('bg-primary-base')}

      if (currentDate.day === initialDay.current && currentDate.month === month && currentDate.year === year) {
        div.current.classList.remove('bg-primary-base');
        div.current.classList.add('bg-secondary-light');
      } else {
        div.current.classList.remove('bg-secondary-light');
      }

    }, [dateTrigger])

    useEffect(() => {
      div.current.classList.remove('bg-primary-base')
    }, [yearTrigger])

  return (
    <div ref={div} className={`size-9 flex justify-items-center items-center rounded-3xl ${font == undefined? '': font}`}>
        <button className='w-full text-center align-middle' onClick={handleClick}>{text}</button>
    </div>
  )
}
