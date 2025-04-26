import React from "react";
import { RoleInput } from "./RoleInput";

export const Roles = ({ setRoleId }) => {

  return (
    <div className="text-secondary-base mt-4 mb-4">
      <p className="text-4xl pb-2">¿Que eres?</p>
      <RoleInput id={"role3"} text={"Psicolog@"} value={3} handleClick={() => setRoleId(3)}/>
      <RoleInput id={"role2"} text={"Paciente"} value={2} handleClick={() => setRoleId(2)}/>
    </div>
  );
};
