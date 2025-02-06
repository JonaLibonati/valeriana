import React, {useState} from 'react'
import { ChevronDownIcon } from '../icons/ChevronDownIcon'

export const Select = ({placeholder, setter, elements}) => {

    const [selection, setSelection] = setter
    const [selectionToggle, setSelectionToggle] = useState(false)

  return (
    <div onClick={() => {selectionToggle? setSelectionToggle(false) : setSelectionToggle(true)}}
      className={`relative flex flex-wrap cursor-pointer p-1 pr-2 pl-2 ${selectionToggle? "outline outline-1 outline-primary-base": ""}`}
    >
      <div className='pr-1'>{selection? selection[0] : placeholder}</div>
      <ChevronDownIcon className={"self-center"} />
      {selectionToggle?
      <>
        <div className='mt-2 mb-1 flex flex-wrap bg-primary-light rounded-md'>
          {elements.map((element) => 
            <div className='basis-full p-2' onClick={() => setSelection(element)}>{element[0]}</div>
          )}
        </div>
      </> : <></>
      }
    </div>
  )
}
