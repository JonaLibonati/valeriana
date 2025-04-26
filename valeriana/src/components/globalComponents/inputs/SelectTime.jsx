import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SelectNumberUpDown } from "./SelectNumberUpDown";

export const SelectTime = ({ placeholder, setter, maxHours, maxMinutes, initialHour, initialMinutes }) => {
  const [selection, setSelection] = setter;

  const [hour, setHour] = useState(initialHour);
  const [min, setMin] = useState(initialMinutes);
  const [selectionToggle, setSelectionToggle] = useState(false);

  const handleToggle = () => {
    if (!selectionToggle) {
      setSelectionToggle(true)
    } else {
      setSelectionToggle(false)
      setSelection([hour, min])
    }
  }

  return (
    <div
      className={`relative flex flex-wrap cursor-pointer p-1 pr-2 pl-2 ${selectionToggle ? "outline outline-1 outline-primary-base" : ""}`}
    >
      <div
        onClick={handleToggle}
        className={`flex basis-full bg-tertiary-light rounded-md ${selectionToggle ? "text-sm p-1 absolute top-[-15px]" : ""}`}
      >
        <div className={`pr-1 ${selection ? "text-sm" : ""}`}>{placeholder}</div>
        {!selectionToggle && !selection ? <ChevronDownIcon className={"self-center"} /> : <></>}
      </div>
      {selectionToggle ? (
        <div className="mt-2 mb-1 flex flex-wrap bg-primary-light rounded-md w-full">
          <div className="flex  flex-col basis-[40%] place-items-center">
            <SelectNumberUpDown
              setter={[hour, setHour]}
              max={maxHours}
              min={0}
            />
          </div>
          <div className="basis-[20%] text-center self-center">:</div>
          <div className="flex  flex-col basis-[40%] place-items-center">
            <SelectNumberUpDown
              setter={[min, setMin]}
              max={maxMinutes}
              min={0}
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      {selection && !selectionToggle ?
        <>
          <div className='p-2 pt-1 pb-1 ml-2 mt-1 bg-secondary-light rounded-md'>{`${selection[0].toString().padStart(2, '0')} : ${selection[1].toString().padStart(2, '0')}`}</div>
        </> : <></>
      }
    </div>
  );
};
