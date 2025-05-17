import { useState, useRef } from "react";
import { SelectNumberUpDown } from "./SelectNumberUpDown";
import { useClickOutside } from "../../../hooks/useClickOutside";

export const SelectTime = ({ placeholder, setter, maxHours, maxMinutes, initialHour, initialMinutes, className }) => {

  const component = useRef(null);

  const { classFather, ClassOnFatherSelection, classSelection, classElement, classPlaceHolder, classOnPlaceHolderSelection } = className ? className : {};

  const [selection, setSelection] = setter;

  const [hour, setHour] = useState(initialHour);
  const [min, setMin] = useState(initialMinutes);
  const [selectionToggle, setSelectionToggle] = useState(false);

  useClickOutside(component, () => {
    if(selectionToggle) {
      setSelection([hour, min])
    }
    setSelectionToggle(false)
  })

  const handleToggle = () => {
    if(selectionToggle) {
      setSelection([hour, min])
    }
    setSelectionToggle(state => !state)
  }

  return (
    <div ref={component} className='cursor-pointer'>
      {placeholder ?
        <div onClick={handleToggle} className={`flex basis-full bg-tertiary-light rounded-md ${classPlaceHolder || ""} ${selectionToggle ? classOnPlaceHolderSelection || "" : ""}`}>
          <div className={`pr-1 ${selection ? "text-sm" : ""}`}>{placeholder}</div>
        </div> :
        <></>}
      <div className={`flex ${classFather || ''} ${selectionToggle ? ClassOnFatherSelection || "" : ""}`}>
        {selectionToggle ?
          <div className={`flex bg-primary-light rounded-md w-full ${classElement || ''}`}>
            <div className="flex flex-col basis-[40%] place-items-center">
              <SelectNumberUpDown
                setter={[hour, setHour]}
                max={maxHours}
                min={0}
              />
            </div>
            <div className="basis-[20%] text-center self-center">:</div>
            <div className="flex flex-col basis-[40%] place-items-center">
              <SelectNumberUpDown
                setter={[min, setMin]}
                max={maxMinutes}
                min={0}
              />
            </div>
          </div>
         :
          <></>
        }

        {selection && !selectionToggle ?
          <>
            <div onClick={handleToggle} className={`${classSelection || ''}`}>{`${selection[0].toString().padStart(2, '0')} : ${selection[1].toString().padStart(2, '0')}`}</div>
          </> : <></>
        }
      </div>
    </div>
  );
};
