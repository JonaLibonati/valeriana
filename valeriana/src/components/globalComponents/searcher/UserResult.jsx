import React from "react";
import { PersonAddIcon } from "../icons/PersonAddIcon";

export const UserResult = ({ user, handleClick }) => {

  return (
    <div className="flex justify-between min-w-[250px] basis-[19.1%] p-2 pl-4 pr-4 bg-secondary-light rounded-md">
      <div>
        <div className="text-primary-dark">{user.user_name}</div>
        <div className="pl-2 text-sm text-tertiary-dark">
          {user.first_name} {user.last_name}
        </div>
        <div className="pl-2 text-sm text-tertiary-dark">
          {user.email_address}
        </div>
      </div>
      <button onClick={handleClick}>
        <PersonAddIcon
          className={"size-8 self-center hover:text-primary-dark"}
        />
      </button>
    </div>
  );
};
