import React from "react";

export const FilledButton = ({ children, className }) => {
  return (
    <div className={`grid content-center size-full p-4 pt-1 pb-1 rounded-md text-tertiary-light bg-primary-base focus-visible:outline-0 cursor-pointer ${className}`}>
      {children}
    </div>
  );
};
