import React, {useRef, useState} from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside';

export const SelectMultipleFromList = ({placeholder, setter, elements, className, handleSubmit, children}) => {

  const component = useRef (null)

  const [classFather, classSelection, classElements, classElement, ClassOnFatherSelection] = className ? className : [];

    const [selection, setSelection] = setter;
    const [selectionToggle, setSelectionToggle] = useState(false);

    useClickOutside(component, () => setSelectionToggle(false))

    const handleClickSelected = async (selectedelement) => {
      if (handleSubmit) {
        try {
          await handleSubmit(selection.filter((item) => item !== selectedelement));
          setSelection((selection) => selection.filter((item) => item !== selectedelement))
        } catch (error) {
          console.log(error)
        }
      } else {
        setSelection((selection) => selection.filter((item) => item !== selectedelement))
      }
    }

    const handleClickOptions = async (element) => {
      if (handleSubmit) {
        try {
          await handleSubmit([...selection, element]);
          setSelection((selection) => [...selection, element])
        } catch (error) {
          console.log(error)
        }
      } else {
        setSelection((selection) => [...selection, element])
      }
    }

  return (
    <div ref={component} onClick={() => {selectionToggle? setSelectionToggle(false) : setSelectionToggle(true)}}
      className={`relative h-full flex flex-wrap cursor-pointer ${classFather? classFather : ''} ${selectionToggle? ClassOnFatherSelection : ""}`}
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
          {selection.map((selectedelement) =>
            <div className={`${classElement? classElement : ''}`} onClick={async () => await handleClickSelected(selectedelement)}>{selectedelement}</div>
          )}
        </div>
        <div className={`${classElements? classElements : ''} flex flex-wrap`}>
          {elements.map((element) =>
            <div className={`${classElement? classElement : ''}`} onClick={async () => await handleClickOptions(element)}>{element}</div>
          )}
        </div>
      </> : <></>
      }

      {selection && !selectionToggle?
      <>
        <div className={`h-fit self-center ${classSelection? classSelection : ''}`}>
          {selection.map((item) => <>{item}  </>)}
        </div>
      </> : <></>
      }
    </div>
  )
}
