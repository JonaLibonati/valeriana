import React from 'react'
import { SelectFromList } from '../globalComponents/inputs/SelectFromList'

export const ConfigSelectFromList = ({ selection, elements, handleSubmit, children }) => {

  return (
    <SelectFromList
      handleSubmit={handleSubmit}
      setter={[selection, () => { }]}
      elements={elements}
      className={{ classElements: "m-1 p-1", classElement: 'm-1 p-1 bg-primary-light rounded-md', ClassOnFatherSelection: "outline outline-1 outline-primary-base" }}>
      {children}
    </SelectFromList>
  )
}
