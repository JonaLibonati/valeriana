import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

export const ThemeButton = ({ theme }) => {
  const button = useRef(null);

  const { themeColors, useSetTheme } = useContext(ThemeContext);

  useEffect(() => {
    button.current.style.backgroundColor = themeColors.selector[theme];
  }, []);

  return (
    <button
      ref={button}
      className={`size-6 rounded-full`}
      onClick={() => useSetTheme(theme)}
    ></button>
  );
};
