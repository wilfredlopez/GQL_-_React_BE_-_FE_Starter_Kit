import { createContext, useCallback } from "react";
import React, { useState, useMemo } from "react";
import { ThemeModeType } from "../theme";
import config from "../config";

export interface ThemeContextType {
  themeMode: ThemeModeType;
  changeTheme: (theme: ThemeModeType) => void;
}

const initialContext: ThemeContextType = {
  themeMode: "light",
  changeTheme: () => {}
};

const ThemeContext = createContext(initialContext);

const ThemeContextProvider: React.FC = props => {
  const [themeMode, setThemeMode] = useState<ThemeModeType>(
    initialContext.themeMode
  );

  React.useEffect(() => {
    const isThemeLocal: ThemeModeType | null = localStorage.getItem(
      config.LOCAL_STORAGE_THEME_NAME
    ) as any;
    if (isThemeLocal) {
      console.log("is Theme Local = true");
      setThemeMode(isThemeLocal);
    } else {
      localStorage.setItem(
        config.LOCAL_STORAGE_THEME_NAME,
        initialContext.themeMode
      );
      console.log("is Theme Local = false");
    }
  }, []);

  const memoTheme = useMemo(
    () => ({
      themeMode,
      setThemeMode
    }),
    [themeMode, setThemeMode]
  );

  const changeTheme = useCallback(
    (t: ThemeModeType) => {
      localStorage.setItem(config.LOCAL_STORAGE_THEME_NAME, t);
      setThemeMode(t);
    },
    [setThemeMode]
  );
  //   function changeTheme(t: ThemeModeType){

  //   }

  return (
    <ThemeContext.Provider
      value={{
        themeMode: memoTheme.themeMode,
        changeTheme
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
