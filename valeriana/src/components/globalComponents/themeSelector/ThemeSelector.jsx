import React from "react";
import { ThemeButton } from "./ThemeButton";

export const ThemeSelector = () => {

  return (
    <div className="absolute flex gap-4 right-0 p-3 mr-10 rounded-full bg-tertiary-light">
      <ThemeButton themeName={'lightRose'} />
      <ThemeButton themeName={'lightSky'} />
      <ThemeButton themeName={'dark'} />
    </div>
  );
};
