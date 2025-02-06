import React, { useContext } from 'react';
import { Day } from './subcomponents/Day';
import { DateContext } from '../../contexts/DateContext';
import { YearSeletor } from './subcomponents/YearSeletor';
import { DateNumber } from './subcomponents/DateNumber';
import { MonthSeletorCarruselType } from './subcomponents/MonthSeletorCarruselType';
import { dayAbbr } from '../../helpers/time'

export const CalendarWeek = () => {

    const { daysInSelectedMonth, selectedDate } = useContext(DateContext);
        return (
            <div className='m-[30px] min-w-[1000px] '>
                <div className='rounded-md bg-primary-base relative'>
                    <div className='p-4 ml-2.5 text-2xl text-white'>
                        <YearSeletor className={'bg-primary-base'} />
                    </div>
                    <div className='p-4 text-2xl text-white bg-primary-dark'>
                        <MonthSeletorCarruselType className={'bg-primary-dark'} />
                    </div>
                    <div className='justify-items-center gap-8 rounded-b-md bg-tertiary-light p-4'>
                        <div className='relative w-full'>
                            <div className='grid grid-cols-7 gap-1'>
                                { dayAbbr.map( (text) => <Day text={text}/> ) }
                                { daysInSelectedMonth.map( (text, i) =>
                                <>
                                <div className='h-[200px] border border-secondary-light p-1'>
                                    <DateNumber text={text} font={'text-xs'} day={text} month={selectedDate.current.getMonth()} year={selectedDate.current.getFullYear()} i={i} key={i}/>
                                </div>
                                </>) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
