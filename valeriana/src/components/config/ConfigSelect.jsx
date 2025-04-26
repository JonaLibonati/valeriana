import React, {useState} from 'react';

export const ConfigSelect = ({setter, elements}) => {

    const [selection, setSelection] = setter
    const [selectionToggle, setSelectionToggle] = useState(false)

  return (
    <div onClick={() => {selectionToggle? setSelectionToggle(false) : setSelectionToggle(true)}}
      className={`relative flex flex-wrap cursor-pointer ${selectionToggle? "outline outline-1 outline-primary-base": ""}`}
    >
      {selectionToggle?
      <>
        <div className='flex flex-wrap'>
          {elements.map((element) =>
            <div className='m-1 p-1 bg-primary-light rounded-md' onClick={() => setSelection(element)}>{element[0]}</div>
          )}
        </div>
      </> : <></>
      }

      {selection && !selectionToggle?
      <>
        <div>{selection[0]}
        </div>
      </> : <></>
      }
    </div>
  )
}
