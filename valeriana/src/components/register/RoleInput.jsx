import React from "react";

export const RoleInput = ({ text, id, value, handleClick}) => {
  return (
    <div className="relative mt-2 text-xl hover:text-primary-dark hover:text-2xl transition-all">
      <label className="absolute size-full bg-tertiary-light" htmlFor={id}>
        {text}
      </label>
      <input
        id={id}
        type="button"
        name="user_roleId"
        value={value}
        onClick={handleClick}
      />
    </div>
  );
};
