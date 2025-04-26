import React, {useState} from 'react'
import { SelectFromList } from '../globalComponents/inputs/SelectFromList'

export const ConfigSelectFromList = ({setter, elements, children}) => {

  return (
    <SelectFromList setter={setter} elements={elements} className={[undefined, undefined, "m-1 p-1", 'm-1 p-1 bg-primary-light rounded-md', "outline outline-1 outline-primary-base"]}>{children}</SelectFromList>
  )
}
