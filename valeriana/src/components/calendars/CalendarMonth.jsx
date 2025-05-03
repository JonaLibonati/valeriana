import React, { useContext } from 'react';
import { Day } from './subcomponents/Day';
import { useDate } from '../../contexts/DateContext';
import { YearSeletor } from './subcomponents/YearSeletor';
import { DateNumber } from './subcomponents/DateNumber';
import { MonthSeletorCarruselType } from './subcomponents/MonthSeletorCarruselType';
import { dayAbbr, toDate } from '../../helpers/time';
import { BulletEvent } from './subcomponents/BulletEvent';
import { PatientContext } from '../../contexts/PatientContext';


export const CalendarMonth = ({timeZone}) => {

    const { daysInSelectedMonth, selectedDateRef } = useDate();

    const { myMeetings, myPatients, PatientsHelpers } = useContext(PatientContext);

    return (
        <div className='min-w-[1000px] '>
            <div className='rounded-md bg-primary-base relative'>
                <div className='p-4 ml-2.5 text-2xl text-white'>
                    <YearSeletor className={'bg-primary-base'} />
                </div>
                <div className='p-4 text-2xl text-white bg-primary-dark'>
                    <MonthSeletorCarruselType className={'bg-primary-dark'} />
                </div>
                <div className='justify-items-center gap-8 rounded-b-md bg-tertiary-light pt-4 pr-4 pb-4'>
                    <div className='relative w-full'>
                        <div className='grid grid-cols-7 gap-1'>
                            { dayAbbr.map( (text) => <Day text={text}/> ) }
                            { daysInSelectedMonth.map( (day, i) =>
                            <>
                            <div className='h-[200px] border border-secondary-light p-1 overflow-scroll'>
                                <DateNumber text={day} font={'text-xs'} day={day} month={selectedDateRef.current.month} year={selectedDateRef.current.year} timeZone={timeZone} i={i} key={i}/>
                                {myMeetings.map( (meeting) => {
                                    const meetingDate = toDate(meeting.meeting_start_time, timeZone)
                                    if (meetingDate.day == day && meetingDate.month == selectedDateRef.current.month && meetingDate.year == selectedDateRef.current.year) {
                                        const patient_name = PatientsHelpers.findPatientByID(meeting.patient_id).user_name
                                        return <BulletEvent text={`${patient_name} - ${meetingDate.hour.toString().padStart(2, '0')}:${meetingDate.minute.toString().padStart(2, '0')}`}/>
                                    }
                                }
                            )}
                            </div>
                            </>) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
