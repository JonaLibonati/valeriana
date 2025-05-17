import React from 'react';
import { Day } from './subcomponents/Day';
import { useDate } from '../../contexts/DateContext';
import { DateNumber } from './subcomponents/DateNumber';
import { dayAbbr, toDate } from '../../helpers/time';
import { BulletEvent } from './subcomponents/BulletEvent';
import { useData } from '../../contexts/DataContext';
import { Temporal } from 'temporal-polyfill';

export const CalendarMonth = ({ timeZone }) => {

  const { daysInSelectedMonth, selectedDateRef, selectedDate } = useDate();

  const { user, meetings } = useData();

  return (
    <div className='min-w-[1000px] '>
      <div className='rounded-md bg-primary-base relative'>
        <div className='justify-items-center gap-8 rounded-b-md bg-tertiary-light pt-2'>
          <div className='relative w-full'>
            <div className='grid grid-cols-7 gap-1'>
              {dayAbbr.map((text) => <Day text={text} />)}
              {daysInSelectedMonth.map((date, i) =>
                <>
                  <div className='h-[200px] border border-secondary-light p-1 overflow-scroll'>
                    <DateNumber date={date} font={'text-xs'} key={i} />
                    {meetings.map((meeting) => {
                      const meetingDate = toDate(meeting.meeting_start_time, timeZone)
                      const meetingEndDate = toDate(meeting.meeting_end_time, timeZone)
                      if (meetingDate.day == date.day && meetingDate.month == date.month && meetingDate.year == date.year) {
                        let name = "";
                        if (user.role_name === "psychologist") name = meeting.patient_user_name
                        else if (user.role_name === "patient") name = meeting.psychologist_user_name
                        return <BulletEvent text={`${name} - ${meetingDate.hour.toString().padStart(2, '0')}:${meetingDate.minute.toString().padStart(2, '0')} a ${meetingEndDate.hour.toString().padStart(2, '0')}:${meetingEndDate.minute.toString().padStart(2, '0')}`} />
                      }
                    }
                    )}
                  </div>
                </>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
