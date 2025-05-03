import { useState, useEffect } from "react";
import { CalendarYear } from "../components/calendars/CalendarYear"
import { CalendarMonth } from "../components/calendars/CalendarMonth"
import { RuleSelector } from "../components/appointments/RuleSelector";
import { google } from "../api/google";
import { OutlineButton } from "../components/globalComponents/buttons/OutlineButton";
import { GoogleCalendarIcon } from "../components/globalComponents/icons/GoogleCalendarIcon"
import { SelectFromList } from '../components/globalComponents/inputs/SelectFromList'
import { Temporal } from "temporal-polyfill";
import { useData } from "../contexts/DataContext";
import { useDate } from "../contexts/DateContext";

export const AppointmentsPage = () => {

    const { config } = useData();

    const { selectedDateRef, setSelectedDate, currentDateRef, setCurrentDate} = useDate();

    const [isGoogleSync, setisGoogleSync] = useState(false);

    const [timeZone, setTimeZone] = useState(config.calendar_time_zone || Temporal.Now.zonedDateTimeISO().timeZoneId);

    const timeZoneOptions = config.calendar_time_zones_list? [config.calendar_time_zone || timeZone, ...JSON.parse(config.calendar_time_zones_list)[0]] : [timeZone];

    useEffect(() => {
        google.isCalendarSync()
        .then(({body}) => {
            setisGoogleSync(body.data.google_calendar_is_sync)
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    useEffect(() => {
        const { day, month, year} = selectedDateRef.current;
        selectedDateRef.current = Temporal.ZonedDateTime.from({year, month, day, timeZone});
        setSelectedDate((date) => Temporal.ZonedDateTime.from({year: date.year, month: date.month, day: date.day, timeZone}))
        currentDateRef.current = Temporal.ZonedDateTime.from({year: currentDateRef.current.year, month: currentDateRef.current.month, day: currentDateRef.current.day, timeZone});
        setCurrentDate((date) => Temporal.ZonedDateTime.from({year: date.year, month: date.month, day: date.day, timeZone}))
    }, [timeZone])

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
                    <div className="mt-6">
                        <SelectFromList
                            placeholder={'Zona horaria'}
                            setter={[timeZone, setTimeZone]}
                            elements={timeZoneOptions}
                            className={["p-1 pr-2 pl-2", "text-sm p-2 pt-1 pb-1 ml-2 mt-1 bg-secondary-light rounded-md", "text-sm mt-2 mb-1 bg-primary-light rounded-md", 'basis-full p-2', "outline outline-1 outline-primary-base"]}/>
                    </div>
                </div>
                {
                    selectedCalendar == 0?
                    <>work in progress</> :
                    selectedCalendar == 1?
                    <>work in progress</> :
                    selectedCalendar == 2?
                    <CalendarMonth timeZone={timeZone}/> :
                    selectedCalendar == 3?
                    <CalendarYear /> :
                    <></>
                }
            </div>
        </>
    )
}
