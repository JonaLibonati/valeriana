import { CalendarNav } from './subcomponents/CalendarNav'
import { useAppointments } from '../../contexts/AppointmentsContext';
import { CalendarYear } from './CalendarYear';
import { CalendarMonth } from './CalendarMonth';

export const Calendar = () => {

  const {selectedCalendar, timeZone} = useAppointments();

  return (
    <div className='min-w-[1000px] '>
      <div className='rounded-md relative'>
        <CalendarNav />
        {
          selectedCalendar == 0 ?
            <>work in progress</> :
            selectedCalendar == 1 ?
              <>work in progress</> :
              selectedCalendar == 2 ?
                <CalendarMonth timeZone={timeZone} /> :
                selectedCalendar == 3 ?
                  <CalendarYear /> :
                  <></>
        }
      </div>
    </div>
  )
}
