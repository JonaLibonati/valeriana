import React, { useEffect, useRef } from 'react'
import { useDate } from '../../../contexts/DateContext';
import { Temporal } from 'temporal-polyfill';

export const DateNumber = ({ font, date }) => {
  const { selectedDateRef, selectedDate, currentDateRef, useUpdateSelectedDate, daysInSelectedMonth } = useDate();

  const { year, month, day } = date;
  const { hour, minute, timeZoneId: timeZone } = selectedDateRef.current;

  const div = useRef(null);
  //const initialDay = useRef(day);

  const handleClick = () => {
    if (day != "") {
      div.current.classList.add('bg-primary-base');
      const auxDate = Temporal.ZonedDateTime.from({ year, month, day, hour, minute, timeZone });
      useUpdateSelectedDate(auxDate);
    }
  }

  useEffect(() => {
    if (currentDateRef.current.day === day && currentDateRef.current.month === month && currentDateRef.current.year === year) {
      div.current.classList.remove('bg-primary-base');
      div.current.classList.add('bg-secondary-light');
    } else {
      div.current.classList.remove('bg-secondary-light');
    }
  }, [daysInSelectedMonth])

  useEffect(() => {
    if (selectedDateRef.current.day != day || selectedDateRef.current.month != month || selectedDateRef.current.year != year) {
      div.current.classList.remove('bg-primary-base');
    }
  }, [selectedDate]);

  return (
    <div ref={div} className={`size-9 flex justify-items-center items-center rounded-3xl ${font || ''}`}>
      <button className='w-full text-center align-middle' onClick={handleClick}>{day}</button>
    </div>
  )
}
