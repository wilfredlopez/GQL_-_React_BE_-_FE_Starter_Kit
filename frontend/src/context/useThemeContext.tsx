import { useContext } from "react";
import { ThemeContext } from "./themeContext";
import { ThemeModeType } from "../theme";

const useThemeContext = () => {
  const { changeTheme, themeMode } = useContext(ThemeContext);

  function handleChangeTheme(newMode: ThemeModeType) {
    changeTheme(newMode);
  }

  return {
    changeTheme,
    themeMode,
    handleChangeTheme
  };
};

export default useThemeContext;
