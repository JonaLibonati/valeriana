import React, {useContext, useState } from 'react'
import { Select } from '../../globalComponents/inputs/Select';
import { DateContext } from '../../../contexts/DateContext';
import { SelectTime } from '../../globalComponents/inputs/SelectTime';

export const CreateMeeting = () => {

  const { selectedDate } = useContext(DateContext);
  const [patient, setPatient] = useState(null)
  const [meetingDate, setMeetingDate] = useState(null)
  const [meetingTime, setMeetingTime] = useState(null)

  const RepeatOptions = [['Una vez', '0'], ['Cada dia', '1'], ['Cada semana', '2'], ['Cada mes', '3'], ['Cada Año', '4']]

  return (
    <div className='pt-4 pl-2'>
      <Select placeholder={"Selecionar paciente"} setter={[patient, setPatient]} elements={[['Patient 1', "element1"], ['Patient 2', "element2"]]}/>
      <div className='p-1 pr-2 pl-2'>{selectedDate.current.toString()}</div>
      <Select placeholder={"Repetir"} setter={[meetingDate, setMeetingDate]} elements={RepeatOptions}/>
      <SelectTime placeholder={"Selecionar hora"} setter={[meetingTime, setMeetingTime]} maxHours={23} maxMinutes={59}/>
      <div className='p-1 pr-2 pl-2'>Select Durarion</div>
    </div>
    
  )
}
