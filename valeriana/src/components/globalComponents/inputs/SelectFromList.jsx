import { useRef, useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside';

export const SelectFromList = ({ placeholder, setter, elements, className, handleSubmit, children }) => {

  const component = useRef(null);

  const { classFather, ClassOnFatherSelection, classSelection, classElements, classElement, classPlaceHolder, classOnPlaceHolderSelection } = className ? className : {};

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
    <div ref={component} className='cursor-pointer' onClick={() => { selectionToggle ? setSelectionToggle(false) : setSelectionToggle(true) }}>
      {placeholder ?
        <div className={`flex basis-full bg-tertiary-light rounded-md ${classPlaceHolder || ""} ${selectionToggle ? classOnPlaceHolderSelection || "" : ""}`}>
          <div className={`pr-1 ${selection ? "text-sm" : ""}`}>{placeholder}</div>
        </div> :
        <></>}
      <div className={`relative flex flex-wrap ${classFather || ''} ${selectionToggle ? ClassOnFatherSelection || "" : ""}`}>
        {selectionToggle ?
          <>
            {children}
            <div className={`${classElements || ''} flex flex-wrap`}>
              {elements.map((element) =>
                <div className={`${classElement || ''}`} onClick={async () => await handleClick(element)}>{element}</div>
              )}
            </div>
          </> : <></>
        }

        {selection && !selectionToggle ?
          <>
            <div className={`${classSelection || ''}`}>{selection}</div>
          </> : <></>
        }
      </div>
    </div>
  )
}
