import React from "react";
import "./searcher.css";
import { SearchIcon } from "../icons/SearchIcon";

export const SearcherBar = ({ placeholder, handleSubmit }) => {

  return (
    <form  className="relative w-full flex" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="relative basis-[40px] bg-primary-base text-tertiary-light rounded-l-md pointer-cursor"
      >
        <SearchIcon className={"size-full p-2 z-40"} />
      </button>
      <input
        className="p-2 rounded-r-md pl-2 w-full focus-visible:outline-0 bg-app-white text-tertiary-dark"
        type="text"
        id="searcher"
        placeholder={`Buscar ${placeholder}`}
      />
    </form>
  );
};
