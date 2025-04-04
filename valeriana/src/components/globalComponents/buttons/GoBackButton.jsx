import React from "react";

export const GoBackButton = ({ handleClick }) => {
  return (
    <button
      className="p-2 bg-primary-base text-tertiary-light rounded-full"
      onClick={handleClick}
    >
      <svg
        className="relative right-[1px]"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        />
      </svg>
    </button>
  );
};
