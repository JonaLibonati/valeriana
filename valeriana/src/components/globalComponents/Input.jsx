import React from "react";

export const Input = ({ name, type, placeholder, handleOnChange, vref }) => {

  return (
    <div className="group relative basis-full mt-1">
      <label className="absolute ml-1 mr-1 pl-1 pr-1 rounded-md bg-white text-sm text-gray-400 " htmlFor={`${name}_id`}>{placeholder}</label>
      <input
        className=" group w-full p-4 pt-1 pl-2 pb-1 mt-4 mb-1 border-b-2 t bg-white group-has-[:focus-visible]:border-rose-300 focus-visible:outline-0 sm:text-lg"
        name={name}
        type={type}
        onChange={handleOnChange? ((e) => handleOnChange(e)) : undefined}
        id={`${name}_id`}
        ref={vref}
        value={undefined}
      />
    </div>
  );
};
