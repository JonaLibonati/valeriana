import React, {useContext, useEffect, useState } from 'react'
import { Select } from '../../globalComponents/inputs/Select';
import { useDate } from '../../../contexts/DateContext';
import { SelectTime } from '../../globalComponents/inputs/SelectTime';
import { PatientContext } from '../../../contexts/PatientContext';
import { FilledButton } from '../../globalComponents/buttons/FilledButton';
import { toUtcMySqlDate, toUtcMySqlTime } from '../../../helpers/time';
import { Temporal } from 'temporal-polyfill';

export const CreateMeeting = () => {

  const { myPatients, myMeetings, PatientsHelpers } = useContext(PatientContext);

  const auxPatientsArray = [];
  myPatients.map((patient) => {
    return auxPatientsArray.push([<PatientItem userName={patient.user_name} firstName={patient.first_name} lastName={patient.last_name}/>, patient]);
  })

  const { selectedDateRef, selectedDate } = useDate();

  const [patient, setPatient] = useState(null)
  const [repeat, setRepeat] = useState(null)
  const [meetingTime, setMeetingTime] = useState(null)
  const [durationTime, setDurationTime] = useState(null)

  const RepeatOptions = [['Una vez', '0'], ['Cada dia', '1'], ['Cada semana', '2'], ['Cada mes', '3'], ['Cada Año', '4']]

  useEffect(() => {
    selectedDateRef.current = Temporal.ZonedDateTime.from(
      {
        year: selectedDateRef.current.year,
        month: selectedDateRef.current.month,
        day: selectedDateRef.current.day,
        hour: meetingTime ? meetingTime[0]: 0,
        minute: meetingTime? meetingTime[1]: 0,
        timeZone: Temporal.Now.zonedDateTimeISO().timeZoneId
      });
  }, [meetingTime])


  const handleClick = () => {
    const meetingData = {
        psychologist_patient_id: patient[1].psychologist_patient_id,
        meeting_start_time: toUtcMySqlDate(selectedDateRef.current),
        meeting_duration: toUtcMySqlTime(90)
    }

    console.log(meetingData)
    PatientsHelpers.handleCreateMeeting(meetingData)
}

  return (
    <div className='pt-4 pb-4'>
      <Select placeholder={"Paciente"} setter={[patient, setPatient]} elements={auxPatientsArray} className={["p-1 pr-2 pl-2", "p-2 pt-1 pb-1 ml-2 mt-1 bg-secondary-light rounded-md", "mt-2 mb-1 bg-primary-light rounded-md", 'basis-full p-2', "outline outline-1 outline-primary-base"]} />
      <div className='p-1 pr-2 pl-2'>
        <div className="pr-1 text-sm">Fecha</div>
        <div className='p-2 pt-1 pb-1 ml-2 mt-1 bg-secondary-light rounded-md'>{selectedDate.toLocaleString(navigator.language, {timeZoneName: 'longGeneric'})}</div>
      </div>
      <Select placeholder={"Repetir"} setter={[repeat, setRepeat]} elements={RepeatOptions} className={["p-1 pr-2 pl-2", "p-2 pt-1 pb-1 ml-2 mt-1 bg-secondary-light rounded-md", "mt-2 mb-1 bg-primary-light rounded-md", 'basis-full p-2', "outline outline-1 outline-primary-base"]}/>
      <SelectTime placeholder={"Hora de Inicio"} setter={[meetingTime, setMeetingTime]} maxHours={23} maxMinutes={59} initialHour={12} initialMinutes={0}/>
      <SelectTime placeholder={"Duracion"} setter={[durationTime, setDurationTime]} maxHours={999} maxMinutes={59} initialHour={1} initialMinutes={0}/>
      <FilledButton className={'text-center'}>
        <div onClick={handleClick}>Crear reunion</div>
      </FilledButton>
    </div>
  )
}

const PatientItem = ({userName, firstName, lastName}) => {
  return (
    <>
      <p>{userName}</p>
      <p className='text-sm pl-2'>{`${firstName} ${lastName}`}</p>
    </>
  )
}
