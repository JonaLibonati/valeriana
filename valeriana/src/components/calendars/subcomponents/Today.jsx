import { useDate } from "../../../contexts/DateContext";

export const Today = () => {

  const { handleToday } = useDate();

  return (
    <div className='basis-full flex justify-end' onClick={handleToday}>
      <div className='flex items-center min-w-20 border border-secondary-light rounded-md'>
        <div className='w-full text-center'>Hoy</div>
      </div>
    </div>
  )
}
