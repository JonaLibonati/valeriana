import React, {useRef, useState} from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside';

export const SelectFromList = ({placeholder, setter, elements, className, handleSubmit, children}) => {

  const component = useRef (null)

  const [classFather, classSelection, classElements, classElement, ClassOnFatherSelection] = className ? className : [];

  const [selection, setSelection] = setter;
  const [selectionToggle, setSelectionToggle] = useState(false);

  useClickOutside(component, () => setSelectionToggle(false))

  const handleClick = async (element) => {
    if (handleSubmit) {
      try {
        await handleSubmit(element);
        setSelection(element);
      } catch (error) {
        console.log(error)
      }
    } else {
      setSelection(element);
    }
  }

  return (
    <div ref={component} onClick={() => {selectionToggle? setSelectionToggle(false) : setSelectionToggle(true)}}
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
            <div  className={`${classElement? classElement : ''}`} onClick={async () => await  handleClick(element)}>{element}</div>
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
