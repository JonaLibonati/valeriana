import React from "react";

export const FilledButton = ({ children }) => {
  return (
    <div className="grid content-center w-full p-4 pt-1 pb-1 mt-1 mb-1 rounded-md text-tertiary-light bg-primary-base focus-visible:outline-0 cursor-pointer">
      {children}
    </div>
  );
};
