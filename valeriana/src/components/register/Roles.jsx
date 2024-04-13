import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { RoleInput } from "./RoleInput";

export const Roles = () => {
  const { handleOnChange } = useContext(UserContext);

  return (
    <div className="text-gray-400">
      <p className="text-4xl pb-2">¿Que eres?</p>
      <RoleInput id={"role2"} text={"Doctor/a"} value={2} handleClick={handleOnChange}/>
      <RoleInput id={"role3"} text={"Paciente"} value={3} handleClick={handleOnChange}/>
    </div>
  );
};
