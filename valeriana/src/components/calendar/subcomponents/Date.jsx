import React, { useContext, useEffect, useRef } from 'react'
import { DateContext } from '../../../contexts/DateContext';

export const Date = ({ text, font }) => {

    const { selectedDate, date, setDate, days } = useContext(DateContext);

    const div = useRef(null);

    const handleClick = () => {
        selectedDate.current.setDate(text);
        setDate(selectedDate.current.getDate())
    }

    useEffect(() => {
      selectedDate.current.getDate() === parseInt(text)?
        div.current.classList.add('bg-white') :
        div.current.classList.remove('bg-white');
    }, [date, days])

  return (
    <div ref={div} className={`size-9 flex justify-items-center items-center rounded-3xl ${font == undefined? '': font}`}>
        <button className='w-full text-center align-middle' onClick={handleClick}>{text}</button>
    </div>
  )
}
