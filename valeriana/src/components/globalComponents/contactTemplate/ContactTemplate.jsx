import React from "react";

export const ContactTemplate = ({
  user_name,
  first_name,
  last_name,
  email_address,
  className,
  children
}) => {
  return (
    <div className={`flex flex-wrap gap-4 justify-between w-full ${className}`}>
      <div className="flex justify-between text-primary-dark">
        <div className="w-max">
          <div className="text-3xl">{user_name}</div>
          <div className="w-full pl-2 text-sm text-tertiary-dark">
            {first_name} {last_name}
          </div>
          <div className="w-full pl-2 text-sm text-tertiary-dark">
            {email_address}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
