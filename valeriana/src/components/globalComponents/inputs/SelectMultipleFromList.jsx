import React, { useRef, useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside';

export const SelectMultipleFromList = ({ placeholder, setter, elements, className, handleSubmit, children }) => {

  const component = useRef(null)

  const { classFather, ClassOnFatherSelection, classSelection, classElements, classElement, classPlaceHolder, classOnPlaceHolderSelection } = className ? className : {};

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
    <div ref={component} className='cursor-pointer' onClick={() => { selectionToggle ? setSelectionToggle(false) : setSelectionToggle(true) }}>
      {placeholder ?
        <div className={`flex basis-full bg-tertiary-light rounded-md ${classPlaceHolder || ""} ${selectionToggle ? classOnPlaceHolderSelection || "" : ""}`}>
          <div className={`pr-1 ${selection ? "text-sm" : ""}`}>{placeholder}</div>
        </div> :
        <></>}
      <div className={`relative h-full flex flex-wrap ${classFather || ''} ${selectionToggle ? ClassOnFatherSelection || "" : ""}`} >
        {selectionToggle ?
          <>
            {children}
            <div className={`${classElements || ''} flex flex-wrap`}>
              {selection.map((selectedelement) =>
                <div className={`${classElement || ''}`} onClick={async () => await handleClickSelected(selectedelement)}>{selectedelement}</div>
              )}
            </div>
            <div className={`${classElements || ''} flex flex-wrap`}>
              {elements.map((element) =>
                <div className={`${classElement || ''}`} onClick={async () => await handleClickOptions(element)}>{element}</div>
              )}
            </div>
          </> : <></>
        }

        {selection && !selectionToggle ?
          <>
            <div className={`h-fit self-center ${classSelection || ''}`}>
              {selection.map((item) => <>{item}  </>)}
            </div>
          </> : <></>
        }
      </div>
    </div>

  )
}
