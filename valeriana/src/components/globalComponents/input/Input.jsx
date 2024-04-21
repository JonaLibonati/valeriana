import React from "react";
import './input.css';

export const Input = ({ name, type, placeholder, handleOnChange, vref, maxLength }) => {

  return (
    <div className="group relative basis-full mt-1 bg-tertiary-light" >
      <label className="absolute ml-1 mr-1 pl-1 pr-1 rounded-md text-sm text-secondary-base " htmlFor={`${name}_id`}>{placeholder}</label>
      <input
        className="text-tertiary-dark group w-full bg-tertiary-light autofill p-4 pt-1 pl-2 pb-1 mt-4 mb-1 border-secondary-light border-b-2 group-has-[:focus-visible]:border-primary-base focus-visible:outline-0 sm:text-lg"
        name={name}
        type={type}
        onChange={handleOnChange? ((e) => handleOnChange(e)) : undefined}
        id={`${name}_id`}
        ref={vref}
        value={undefined}
        maxLength={maxLength}
      />
    </div>
  );
};
