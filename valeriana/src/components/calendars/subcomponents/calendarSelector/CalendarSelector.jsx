import React from 'react'
import { CalendarSelectorButton } from './CalendarSelectorButton'

export const CalendarSelector = () => {
  return (
    <div className="flex text-sm border border-secondary-light rounded-md">
      <CalendarSelectorButton text={'Dia'} className={"border-r border-secondary-light"} calendarTypeID={0}/>
      <CalendarSelectorButton text={'Semana'} className={"border-r border-secondary-light"} calendarTypeID={1}/>
      <CalendarSelectorButton text={'Mes'} className={"border-r border-secondary-light"} calendarTypeID={2}/>
      <CalendarSelectorButton text={'Año'} calendarTypeID={3}/>
    </div>
  )
}
