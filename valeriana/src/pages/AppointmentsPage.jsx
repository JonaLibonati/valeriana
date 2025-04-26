import { useContext, useState, useEffect } from "react";
import { CalendarYear } from "../components/calendars/CalendarYear"
import { CalendarMonth } from "../components/calendars/CalendarMonth"
import { RuleSelector } from "../components/appointments/RuleSelector";
import { google } from "../api/google";
import { OutlineButton } from "../components/globalComponents/buttons/OutlineButton";
import { GoogleCalendarIcon } from "../components/globalComponents/icons/GoogleCalendarIcon"

export const AppointmentsPage = () => {

    const [isGoogleSync, setisGoogleSync] = useState(false);

    useEffect(() => {
        google.isCalendarSync()
        .then(({body}) => {
            setisGoogleSync(body.data.google_calendar_is_sync)
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const [selectedCalendar, setSelectedCalendar] = useState(2);

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
                    {isGoogleSync?
                        <div className="grid content-center w-full p-4 pt-1 pb-1 mt-1 mb-1 rounded-md text-tertiary-dark outline outline-green-500">
                            <div className="flex">
                                <GoogleCalendarIcon className={'size-12 mr-2'} />
                                Google calendar Sincronizado
                            </div>
                        </div> :
                        <OutlineButton>
                            <div className="flex" onClick={google.syncCalendar}>
                                <GoogleCalendarIcon className={'mr-2'} />
                                Sincronizar Google Calendar
                            </div>
                        </OutlineButton>
                    }
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
