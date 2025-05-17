import { useAppointments } from '../../../contexts/AppointmentsContext'
import { MonthSeletorCarruselType } from './MonthSeletorCarruselType'
import { Selector } from './Selector'
import { Today } from './Today'
import { YearSelector } from './YearSelector'
import { CalendarSelector } from './calendarSelector/CalendarSelector'

export const CalendarNav = () => {

  const { selectedCalendar } = useAppointments();

  return (
    <div className='flex gap-4'>
      <Selector>
        <YearSelector className={'border border-secondary-light rounded-md'} />
      </Selector>
      {selectedCalendar !== 3 ?
        <Selector>
          <MonthSeletorCarruselType className={'border border-secondary-light rounded-md'} />
        </Selector> : <></>
      }
      <CalendarSelector />
      <Today />
    </div>
  )
}
