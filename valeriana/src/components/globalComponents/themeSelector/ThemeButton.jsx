import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

export const ThemeButton = ({ themeName }) => {
  const button = useRef(null);

  const [isSelected, setIsSelected] = useState(false);

  const { themeColors, useSetTheme, theme } = useContext(ThemeContext);

  useEffect(() => {
    button.current.style.backgroundColor = themeColors.selector[themeName];
    button.current.style.borderColor = themeColors.selector.border[themeName];
  }, []);

  useEffect(() => {
    setIsSelected(false)
    if (themeName === theme) {
      setIsSelected(true);
    }
  }, [theme])


  return (
    <button
      ref={button}
      className={`size-6 rounded-full ${isSelected? 'border-2' : '' }`}
      onClick={() => useSetTheme(themeName)}
    ></button>
  );
};
