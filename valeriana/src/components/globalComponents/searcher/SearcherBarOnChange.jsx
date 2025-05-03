import React from "react";
import "./searcher.css";

export const SearcherBarOnChange = ({ placeholder, handleSubmit, value }) => {

  return (
    <div className="relative w-full flex">
      <input
        className="p-2 rounded-r-md pl-2 w-full focus-visible:outline-0 bg-app-white text-tertiary-dark"
        type="text"
        id="searcher"
        placeholder={`Buscar ${placeholder}`}
        onChange={handleSubmit}
        value={value? value : undefined}
      />
    </div>
  );
};
