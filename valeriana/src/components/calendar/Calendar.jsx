import React, { useContext } from 'react';
import { Day } from './subcomponents/Day';
import { DateContext } from '../../contexts/DateContext';
import { Month } from './subcomponents/Month';
import { MonthSeletor } from './subcomponents/MonthSeletor';
import { Year } from './subcomponents/Year';
import { YearSeletor } from './subcomponents/YearSeletor';
import { SeletedDate } from './subcomponents/SeletedDate';
import { Date } from './subcomponents/Date';
import { Hour } from './subcomponents/Hour';

export const Calendar = () => {

    const { days, dayAbbr, monthSelector, yearSelector } = useContext(DateContext);

    return (
    <div className='m-[200px]'>
        <div className='rounded-md bg-rose-300 w-[300px] relative'>
            <SeletedDate />
            <div className='rounded-md bg-rose-50 p-4'>
                <div className='relative '>
                    {monthSelector? <MonthSeletor /> : <></>}
                    {yearSelector? <YearSeletor /> : <></>}
                    <div className='flex'>
                        <Month />
                        <Year />
                    </div>
                    <div className='grid grid-cols-7 gap-2 justify-items-center items-center h-[300px] '>
                        { dayAbbr.map( (text) => <Day text={text}/> ) }
                        { days.map( (text) => <Date text={text} font={'text-xs'}/> ) }
                    </div>
                </div>
                <hr className='border-gray-300'/>
                <div className='grid grid-cols-5 gap-2 pt-4 justify-items-center items-center '>
                    <Hour hours={9} minutes={0} />
                    <Hour hours={10} minutes={30} />
                    <Hour hours={11} minutes={0} />
                    <Hour hours={12} minutes={0} />
                    <Hour hours={13} minutes={0} />
                    <Hour hours={14} minutes={0} />
                    <Hour hours={15} minutes={0} />
                    <Hour hours={16} minutes={0} />
                    <Hour hours={17} minutes={0} />
                </div>
            </div>
        </div>
    </div>
    )
}
