import React, { useRef } from 'react'
import { SelectMultipleFromList } from '../globalComponents/inputs/SelectMultipleFromList'

export const ConfigMultipleSelect = ({ selection, elements, handleSubmit, children }) => {

  return (
    <SelectMultipleFromList
      handleSubmit={handleSubmit}
      setter={[selection, () => { }]}
      elements={elements}
      className={{ classElements: "m-1 p-1", classElement: 'm-1 p-1 bg-primary-light rounded-md', ClassOnFatherSelection: "outline outline-1 outline-primary-base" }}>
      {children}
    </SelectMultipleFromList>
  )
}
