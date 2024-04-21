import { createContext, useState } from "react";
import { Cookies } from "../helpers/cookies";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => {
        const themeCookie = Cookies.getCookie('theme');
        if(themeCookie) return Cookies.getCookie('theme')
        else return 'lightRose' //default theme
    }
);
    // Themes for JS usage.
  const themeColors = {
    dark: {
      primaryDark: "#7dd3fc",
      primaryBase: "#0ea5e9",
      primaryLight: "#292524",
      secondaryBase: "#a8a29e",
      secondaryLight: "#57534e",
      tertiaryDark: "#e0f2fe",
      tertiaryLight: "#1c1917",
    },
    lightRose: {
      primaryDark: "#fb7185",
      primaryBase: "#fda4af",
      primaryLight: "#fff1f2",
      secondaryBase: "rgb(156 163 175)",
      secondaryLight: "#e5e7eb",
      tertiaryDark: "rgb(0, 0, 0)",
      tertiaryLight: "rgb(255, 255, 255)",
    },

    lightSky: {
      primaryDark: "#38bdf8",
      primaryBase: "#7dd3fc",
      primaryLight: "#f0f9ff",
      secondaryBase: "rgb(156 163 175)",
      secondaryLight: "#e5e7eb",
      tertiaryDark: "rgb(0, 0, 0)",
      tertiaryLight: "rgb(255, 255, 255)",
    },

    selector: {
      lightRose: "#fda4af",
      lightSky: "#7dd3fc",
      dark: "#292524",
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themeColors
      }}
    >
      <div id="theme" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
