
import { Calendar } from "../components/calendars/Calendar";
import { AppointCreate } from "../components/appointments/AppointCreate";
import { AppointGoogleCalendar } from "../components/appointments/AppointGoogleCalendar";
import { AppointTimeZone } from "../components/appointments/AppointTimeZone";

export const AppointmentsPage = () => {

  return (
    <>
      <div className="grid grid-cols-[250px_minmax(900px,_1fr)] bg-tertiary-light rounded-md p-4">
        <div className='rounded-md pr-4'>
          <AppointCreate />
          <AppointGoogleCalendar />
          <AppointTimeZone />
        </div>
        <Calendar />
      </div>
    </>
  )
}
