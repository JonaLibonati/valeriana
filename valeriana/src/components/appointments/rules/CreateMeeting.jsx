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
      <Select placeholder={"Paciente"} setter={[patient, setPatient]} elements={[['Patient 1', "element1"], ['Patient 2', "element2"]]}/>
      <div className='p-1 pr-2 pl-2'>
        <div className="pr-1 text-sm">Fecha</div>
        <div className='p-2 pt-1 pb-1 ml-2 mt-1 bg-secondary-light rounded-md'>{selectedDate.current.toString()}</div>
      </div>
      <Select placeholder={"Repetir"} setter={[meetingDate, setMeetingDate]} elements={RepeatOptions}/>
      <SelectTime placeholder={"Selecionar hora"} setter={[meetingTime, setMeetingTime]} maxHours={23} maxMinutes={59}/>
      <div className='p-1 pr-2 pl-2'>Select Durarion</div>
    </div>
    
  )
}
