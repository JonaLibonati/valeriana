
import { useAppointments } from '../../contexts/AppointmentsContext';
import { SelectFromList } from '../globalComponents/inputs/SelectFromList';

export const AppointTimeZone = () => {
  const { timeZone, setTimeZone, timeZoneOptions } = useAppointments();

  return (
    <SelectFromList
      placeholder={'Zona horaria'}
      setter={[timeZone, setTimeZone]}
      elements={timeZoneOptions}
      className={{ classFather: "p-1 pr-2 pl-2", classSelection: "text-sm p-2 pt-1 pb-1 ml-2 mt-1 bg-secondary-light rounded-md", classElements: "text-sm mt-1 mb-1 bg-primary-light rounded-md", classElement: 'basis-full p-2', ClassOnFatherSelection: "outline outline-1 outline-primary-base", classPlaceHolder: "pt-2", classOnPlaceHolderSelection: "pb-2" }} />
  )
}
