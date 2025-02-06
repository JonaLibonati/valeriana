import React from "react";
import { ChevronDownIcon } from '../icons/ChevronDownIcon'
import { ChevronUpIcon } from '../icons/ChevronUpIcon'

export const SelectNumberUpDown = ({ setter, max, min }) => {
  const [selection, setSelection] = setter;

  const handleClickUp = () => {
    if (selection < max) {
        setSelection ( selection + 1)
    } else setSelection (min)
  }

  const handleClickDown = () => {
    if (selection > min) {
        setSelection (selection - 1)
    } else setSelection (max)
  }

  return (
    <>
      <div className="p-1" onClick={handleClickUp}>
        <ChevronUpIcon />
      </div>
      <div className="text-xl">{selection}</div>
      <div className="p-1" onClick={handleClickDown}>
        <ChevronDownIcon />
      </div>
    </>
  );
};
