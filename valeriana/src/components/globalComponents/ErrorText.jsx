import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useAfterMontingEffect } from "../../hooks/useAfterMontingEffect";

export const useErrorText = () => {
  const [errorText, setErrorText] = useState("");
  const [errorTrigger, setErrorTrigger] = useState(0);

  return {
    errorText,
    errorTrigger,
    errorSetter: { setErrorText, setErrorTrigger },
  };
};

export const ErrorText = ({ errorText, errorTrigger }) => {
  const errorElem = useRef();

  const {theme, themeColors} = useContext(ThemeContext);

  // Managing theme selection
  useAfterMontingEffect(() => {
    errorElem.current.classList.remove('transition-all')
    errorElem.current.classList.remove('duration-[1500ms]')
    errorElem.current.style.backgroundColor	 = themeColors[theme].tertiaryLight;
    errorElem.current.style.color = themeColors[theme].secondaryBase;
  }, [theme])

  useEffect(() => {
    errorElem.current.addEventListener(
      "transitionend",
      () => {
        errorElem.current.style.color = themeColors[theme].secondaryBase;
        errorElem.current.style.backgroundColor	 = themeColors[theme].tertiaryLight;
      }
    );
  }, [theme]);

  useEffect(() => {
    errorElem.current.classList.add('transition-all')
    errorElem.current.classList.add('duration-[1500ms]')
    if (errorText === "") {
      errorElem.current.style.color = themeColors[theme].tertiaryLight;
      errorElem.current.style.backgroundColor	 = themeColors[theme].tertiaryLight;
    }
    if (errorText !== "") {
      errorElem.current.style.color = themeColors[theme].tertiaryLight;
      errorElem.current.style.backgroundColor	 = themeColors[theme].primaryBase;
    }
  }, [errorText, errorTrigger]);

  return (
    <div
      ref={errorElem}
      className=" h-9 rounded-md text-sm italic"
    >
      <p className="p-2">{errorText}</p>
    </div>
  );
};
