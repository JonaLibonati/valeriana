import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SelectNumberUpDown } from "./SelectNumberUpDown";

export const SelectTime = ({ placeholder, setter, maxHours, maxMinutes }) => {
  const [selection, setSelection] = setter;

  const [hour, setHour] = useState(12);
  const [min, setMin] = useState(0);
  const [selectionToggle, setSelectionToggle] = useState(false);

  useEffect(() => {
    setSelection([hour, min])

  }, [hour, min])
  

  return (
    <div
      onClick={() => {
        !selectionToggle ? setSelectionToggle(true) : <></>;
      }}
      className={`relative flex flex-wrap cursor-pointer p-1 pr-2 pl-2 ${
        selectionToggle ? "outline outline-1 outline-primary-base" : ""
      }`}
    >
      <div className="pr-1">{placeholder}</div>
      <ChevronDownIcon className={"self-center"} />
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
    </div>
  );
};
