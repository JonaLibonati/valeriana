import React, { useContext } from 'react';
import { Day } from './subcomponents/Day';
import { DateContext } from '../../contexts/DateContext';
import { YearSeletor } from './subcomponents/YearSeletor';
import { DateNumber } from './subcomponents/DateNumber';
import { dayAbbr, monthNames } from '../../helpers/time'

export const CalendarYear = () => {

    const { daysInSelectedYear, selectedDate } = useContext(DateContext);

    return (
        <div className='min-w-[calc(300px+2rem)]'>
            <div className='rounded-md bg-primary-base relative'>
                <div className='p-4 text-2xl text-white'>
                    <YearSeletor className={'bg-primary-base'} />
                </div>
                <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] justify-items-center gap-8 rounded-b-md bg-tertiary-light p-4'>
                { daysInSelectedYear.map( (days, i) =>
                <>
                    <div className='relative w-[300px] grow-1'>
                        <p className='pl-2.5 text-xl'>{monthNames[i]}</p>
                        <div className='grid grid-cols-7 gap-[2px] justify-items-center items-center h-[300px] '>
                            { dayAbbr.map( (text) => <Day text={text}/> ) }
                            { days.map( (text, j) => <DateNumber text={text} font={'text-xs'} day={text} month={i} year={selectedDate.current.getFullYear()} ij={`${i}${j}`} key={`${i}${j}`}/>) }
                        </div>
                    </div>
                </> ) }
                </div>
            </div>
        </div>
    )
}
