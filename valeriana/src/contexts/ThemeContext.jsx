import { createContext, useContext, useState } from "react";
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

const useSetTheme = (theme) => {
  setTheme(theme);
  Cookies.setCookie('theme', theme);
}

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

    greenEmerald: {
      primaryDark: "#246660",
      primaryBase: "#238a80",
      primaryLight: "#D0E4D2",
      secondaryBase: "rgb(156 163 175)",
      secondaryLight: "#e5e7eb",
      tertiaryDark: "rgb(0, 0, 0)",
      tertiaryLight: "rgb(255, 255, 255)",
    },

    selector: {
      lightRose: "#fda4af",
      greenEmerald: "#238a80",
      lightSky: "#7dd3fc",
      dark: "#292524",
      border: {
        lightRose: "#fb7185",
        greenEmerald: "#246660",
        lightSky: "#38bdf8",
        dark: "#57534e",
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        useSetTheme,
        themeColors
      }}
    >
      <div id="theme" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
