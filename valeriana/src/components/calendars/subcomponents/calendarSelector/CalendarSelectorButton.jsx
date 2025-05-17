import { useAppointments } from "../../../../contexts/AppointmentsContext";

export const CalendarSelectorButton = ({ text, calendarTypeID, className }) => {

  const { setSelectedCalendar } = useAppointments();

  return (
    <button onClick={() => setSelectedCalendar(calendarTypeID)} className={`p-2 ${className || ''}`}>{text}</button>
  )
}
