import { useContext, useState } from "react";
import { CalendarYear } from "../components/calendars/CalendarYear"
import { CalendarMonth } from "../components/calendars/CalendarMonth"
import { PatientContext } from "../contexts/PatientContext"
import { toUtcMySqlDate, toUtcMySqlTime } from "../helpers/time"
import { RuleSelector } from "../components/appointments/RuleSelector";

export const AppointmentsPage = () => {

    const { myPatients, myMeetings, PatientsHelpers } = useContext(PatientContext);

    const handleClick = (e) => {
        const exampleDate = new Date (2025, 0, 15, 10, 0, 0)
        const meetingData = {
            psychologist_patient_id: myPatients[0].psychologist_patient_id,
            meeting_start_time: toUtcMySqlDate(exampleDate),
            meeting_duration: toUtcMySqlTime(90)
        }
        PatientsHelpers.handleCreateMeeting(e, meetingData)
        console.log(toUtcMySqlDate(exampleDate))
        console.log(toUtcMySqlTime(90))
    }

    const [selectedCalendar, setSelectedCalendar] = useState(2)

    const handleSync = async () => {
        const res = await fetch("/v1/google/oauth");
        const body = await res.json();

        window.open(body.oauthUrl, '_blank').focus();
    }

    const handleCreateCalendar = async () => {
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          };

        const res = await fetch("/v1/google/calendar",  options);
        const body = await res.json();

        console.log(res, body);
    }

    const handleDeleteCalendar = async () => {
        const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };

        const res = await fetch("/v1/google/calendar",  options);
        const body = await res.json();

        console.log(res, body);
    }

    const handleGetCalendar = async () => {
        const res = await fetch("/v1/google/calendar");
        const body = await res.json();

        console.log(res, body);
    }

    const handleRevoke = async () => {
        const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
          const res = await fetch("/v1/google/tokens", options);
          const body = await res.json();
          console.log(res, body);
    }

    return (
        <>
            <div className="grid grid-cols-[220px_minmax(900px,_1fr)] bg-tertiary-light rounded-l-md p-4">
                <div className='rounded-md pr-4'>
                    <div className="flex flex-wrap text-sm border border-secondary-light rounded-md mb-4">
                        <button onClick={() => setSelectedCalendar(0)} className="basis-full p-1 border-b border-secondary-light">Dia</button>
                        <button onClick={() => setSelectedCalendar(1)} className="basis-full p-1 border-b border-secondary-light">Semana</button>
                        <button onClick={() => setSelectedCalendar(2)} className="basis-full p-1 border-b border-secondary-light">Mes</button>
                        <button onClick={() => setSelectedCalendar(3)} className="basis-full p-1">Año</button>
                    </div>
                    <RuleSelector />
                    <button onClick={handleSync}>Sincronizar google</button>
                    <button onClick={handleCreateCalendar}>Crear calendario</button>
                    <button onClick={handleRevoke}>Revocar tokens</button>
                    <button onClick={handleGetCalendar}>Get Calendar</button>
                    <button onClick={handleDeleteCalendar}>Delete Calendar</button>
                </div>
                {
                    selectedCalendar == 0?
                    <>work in progress</> :
                    selectedCalendar == 1?
                    <>work in progress</> :
                    selectedCalendar == 2?
                    <CalendarMonth /> :
                    selectedCalendar == 3?
                    <CalendarYear /> :
                    <></>
                }
            </div>
        </>
    )
}
