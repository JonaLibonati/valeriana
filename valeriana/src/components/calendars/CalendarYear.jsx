import React, { useContext } from 'react';
import { Day } from './subcomponents/Day';
import { DateContext } from '../../contexts/DateContext';
import { DateNumber } from './subcomponents/DateNumber';
import { dayAbbr, monthNames } from '../../helpers/time'

export const CalendarYear = () => {

    const { daysInSelectedYear, selectedDateRef } = useContext(DateContext);

    return (
        <div className='min-w-[calc(300px+2rem)]'>
            <div className='rounded-md bg-primary-base relative'>
                <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] justify-items-center gap-8 rounded-b-md bg-tertiary-light pt-2'>
                { daysInSelectedYear.map( (days, i) =>
                <>
                    <div className='relative w-[300px] grow-1'>
                        <p className='pl-2.5 text-xl'>{monthNames[i]}</p>
                        <div className='grid grid-cols-7 gap-[2px] justify-items-center items-center h-[300px] '>
                            { dayAbbr.map( (text) => <Day text={text}/> ) }
                            { days.map( (date, j) => <DateNumber date={date} font={'text-xs'} key={`${i}${j}`}/>) }
                        </div>
                    </div>
                </> ) }
                </div>
            </div>
        </div>
    )
}
