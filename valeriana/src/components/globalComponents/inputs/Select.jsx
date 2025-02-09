import React, {useState} from 'react'
import { ChevronDownIcon } from '../icons/ChevronDownIcon'

export const Select = ({placeholder, setter, elements}) => {

    const [selection, setSelection] = setter
    const [selectionToggle, setSelectionToggle] = useState(false)

  return (
    <div onClick={() => {selectionToggle? setSelectionToggle(false) : setSelectionToggle(true)}}
      className={`relative flex flex-wrap cursor-pointer p-1 pr-2 pl-2 ${selectionToggle? "outline outline-1 outline-primary-base": ""}`}
    >
      <div className={`flex basis-full bg-tertiary-light rounded-md ${selectionToggle? "text-sm p-1 absolute top-[-15px]": ""}`}>
        <div className={`pr-1 ${selection? "text-sm": ""}`}>{placeholder}</div>
        {!selectionToggle && !selection? <ChevronDownIcon className={"self-center"}/> : <></>}
      </div>
      
      {selectionToggle?
      <>
        <div className='mt-2 mb-1 flex flex-wrap bg-primary-light rounded-md'>
          {elements.map((element) => 
            <div className='basis-full p-2' onClick={() => setSelection(element)}>{element[0]}</div>
          )}
        </div>
      </> : <></>
      }

      {selection && !selectionToggle?
      <>
        <div className='p-2 pt-1 pb-1 ml-2 mt-1 bg-secondary-light rounded-md'>{selection[0]}</div>
      </> : <></>
      }
    </div>
  )
}
