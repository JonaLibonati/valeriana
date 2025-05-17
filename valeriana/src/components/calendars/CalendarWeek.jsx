import React, { useContext } from 'react';
import { Day } from './subcomponents/Day';
import { DateContext } from '../../contexts/DateContext';
import { DateNumber } from './subcomponents/DateNumber';
import { dayAbbr } from '../../helpers/time'
import { CalendarMonthSeletor } from './subcomponents/CalendarMonthSeletor';
import { CalendarYearSeletor } from './subcomponents/CalendarYearSeletor';

export const CalendarWeek = () => {

    const { daysInSelectedMonth, selectedDateRef } = useContext(DateContext);
        return (
            <div className='m-[30px] min-w-[1000px] '>
                <div className='rounded-md bg-primary-base relative'>
                    <CalendarYearSeletor />
                    <CalendarMonthSeletor />
                    <div className='justify-items-center gap-8 rounded-b-md bg-tertiary-light p-4'>
                        <div className='relative w-full'>
                            <div className='grid grid-cols-7 gap-1'>
                                { dayAbbr.map( (text) => <Day text={text}/> ) }
                                { daysInSelectedMonth.map( (text, i) =>
                                <>
                                <div className='h-[200px] border border-secondary-light p-1'>
                                    <DateNumber text={text} font={'text-xs'} day={text} month={selectedDateRef.current.getMonth()} year={selectedDateRef.current.getFullYear()} i={i} key={i}/>
                                </div>
                                </>) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
