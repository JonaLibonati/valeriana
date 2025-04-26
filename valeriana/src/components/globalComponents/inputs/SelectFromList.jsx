import React, {useState} from 'react'

export const SelectFromList = ({placeholder, setter, elements, className, children}) => {

    const [classFather, classSelection, classElements, classElement, ClassOnFatherSelection] = className ? className : [];
  
    const [selection, setSelection] = setter;
    const [selectionToggle, setSelectionToggle] = useState(false);

  return (
    <div onClick={() => {selectionToggle? setSelectionToggle(false) : setSelectionToggle(true)}}
      className={`relative flex flex-wrap cursor-pointer ${classFather? classFather : ''} ${selectionToggle? ClassOnFatherSelection : ""}`}
    >
      {placeholder?
        <div className={`flex basis-full bg-tertiary-light rounded-md ${selectionToggle? "text-sm p-1 absolute top-[-15px]": ""}`}>
          <div className={`pr-1 ${selection? "text-sm": ""}`}>{placeholder}</div>
        </div> :
        <></>}
      
      {selectionToggle?
      <>
        {children}
        <div className={`${classElements? classElements : ''} flex flex-wrap`}>
          {elements.map((element) =>
            <div className={`${classElement? classElement : ''}`} onClick={() => setSelection(element)}>{element}</div>
          )}
        </div>
      </> : <></>
      }

      {selection && !selectionToggle?
      <>
        <div className={`${classSelection? classSelection : ''}`}>{selection}</div>
      </> : <></>
      }
    </div>
  )
}
