import { useEffect, useState } from 'react'
import { Select } from '../../globalComponents/inputs/Select';
import { useDate } from '../../../contexts/DateContext';
import { SelectTime } from '../../globalComponents/inputs/SelectTime';
import { FilledButton } from '../../globalComponents/buttons/FilledButton';
import { toUtcMySqlDate, toUtcMySqlTime } from '../../../helpers/time';
import { Temporal } from 'temporal-polyfill';
import { usePsychologist } from '../../../contexts/PsychologistContext';
import { useAppointments } from '../../../contexts/AppointmentsContext';
import { Loading } from '../../globalComponents/loading/Loading';

export const CreateMeeting = () => {

  const { myPatients } = usePsychologist();

  const { handleCreateMeeting, isCreateMeetingLoading } = useAppointments();

  const auxPatientsArray = [];
  myPatients.map((patient) => {
    return auxPatientsArray.push([<PatientItem userName={patient.user_name} firstName={patient.first_name} lastName={patient.last_name} />, patient]);
  })

  const { selectedDateRef, selectedDate, useUpdateSelectedDate } = useDate();

  const [patient, setPatient] = useState(undefined)
  const [repeat, setRepeat] = useState(undefined)
  const [meetingTime, setMeetingTime] = useState(undefined)
  const [durationTime, setDurationTime] = useState(undefined)

  const RepeatOptions = [['Una vez', '0'], ['Cada dia', '1'], ['Cada semana', '2'], ['Cada mes', '3'], ['Cada Año', '4']]

  useEffect(() => {
    const date = Temporal.ZonedDateTime.from(
      {
        year: selectedDateRef.current.year,
        month: selectedDateRef.current.month,
        day: selectedDateRef.current.day,
        hour: meetingTime ? meetingTime[0] : 0,
        minute: meetingTime ? meetingTime[1] : 0,
        timeZone: selectedDateRef.current.timeZoneId
      });
    useUpdateSelectedDate(date);
  }, [meetingTime])

  const handleClick = () => {
    const meetingData = {
      psychologist_patient_id: patient[1].psychologist_patient_id,
      meeting_start_time: toUtcMySqlDate(selectedDateRef.current),
      meeting_end_time: toUtcMySqlDate(selectedDateRef.current.add({hours: durationTime[0], minutes: durationTime[1]})),
      meeting_duration: toUtcMySqlTime(durationTime)
    }

    //console.log(meetingData);

    handleCreateMeeting(meetingData);
  }

  return (
    <div className='p-2'>
      <div className='p-2 bg-secondary-light rounded-md'>{selectedDate.toLocaleString(navigator.language, { timeZoneName: 'longGeneric' })}</div>
      <Select placeholder={"Paciente"} setter={[patient, setPatient]} elements={auxPatientsArray} className={{ classSelection: "text-sm p-2 pt-1 pb-1 mt-1 bg-secondary-light rounded-md", classElements: "text-sm m-2 bg-primary-light rounded-md", classElement: 'basis-full p-2', ClassOnFatherSelection: "outline outline-1 outline-primary-base", classPlaceHolder: " pt-2", classOnPlaceHolderSelection: "text-sm pb-2" }} />
      <Select placeholder={"Repetir"} setter={[repeat, setRepeat]} elements={RepeatOptions} className={{ classSelection: "text-sm p-2 pt-1 pb-1 mt-1 bg-secondary-light rounded-md", classElements: "text-sm m-2 bg-primary-light rounded-md", classElement: 'basis-full p-2', ClassOnFatherSelection: "outline outline-1 outline-primary-base", classPlaceHolder: " pt-2", classOnPlaceHolderSelection: "text-sm pb-2" }} />
      <SelectTime placeholder={"Hora de Inicio"} setter={[meetingTime, setMeetingTime]} maxHours={23} maxMinutes={59} initialHour={12} initialMinutes={0} className={{ classSelection: "text-sm p-2 pt-1 pb-1 mt-1 bg-secondary-light rounded-md", classElement: 'basis-full p-2 m-2', ClassOnFatherSelection: "outline outline-1 outline-primary-base", classPlaceHolder: " pt-2", classOnPlaceHolderSelection: "text-sm pb-2" }} />
      <SelectTime placeholder={"Duracion"} setter={[durationTime, setDurationTime]} maxHours={999} maxMinutes={59} initialHour={1} initialMinutes={0} className={{ classFather: "mb-4", classSelection: "text-sm p-2 pt-1 pb-1 mt-1 bg-secondary-light rounded-md", classElement: 'basis-full p-2 m-2', ClassOnFatherSelection: "outline outline-1 outline-primary-base", classPlaceHolder: " pt-2", classOnPlaceHolderSelection: "text-sm pb-2" }} />
      <Loading isLoading={isCreateMeetingLoading} color={"bg-primary-dark"}>
        <FilledButton className={'text-center'}>
          <div onClick={handleClick}>Crear reunion</div>
        </FilledButton>
      </Loading>
    </div>
  )
}

const PatientItem = ({ userName, firstName, lastName }) => {
  return (
    <>
      <p>{userName}</p>
      <p className='text-sm pl-2'>{`${firstName} ${lastName}`}</p>
    </>
  )
}
