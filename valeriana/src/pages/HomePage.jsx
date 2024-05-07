import React, { useContext } from 'react'
import { TimeContext } from '../contexts/TimeContext';
import { dayAbbr, monthAbbr } from '../helpers/time';

export const HomePage = () => {
  const { date, day, month, hours, minutes } = useContext(TimeContext);

  return (
    <div className='grid grid-cols-12 gap-6'>
        <div className='p-8 col-span-5 min-w-[420px] grid grid-cols-[minmax(0,90px)_minmax(0,0.5fr)_minmax(0,1fr)] grid-rows-2  rounded-md bg-tertiary-light'>
          <p className='row-span-2 self-center max-w-fit text-7xl text-primary-dark'>30</p>
          <p className='pl-4 pr-4 text-3xl text-primary-dark'>{dayAbbr[day]}</p>
          <p className='row-span-2 justify-self-end self-center text-7xl text-primary-dark'>{hours}:{minutes}</p>
          <p className='pl-4 pr-4 text-3xl text-primary-dark'>{monthAbbr[month]}</p>
        </div>
        <div className='p-8 col-span-7 bg-tertiary-light rounded-md'>Proximas consultas</div>
    </div>
  )
}
