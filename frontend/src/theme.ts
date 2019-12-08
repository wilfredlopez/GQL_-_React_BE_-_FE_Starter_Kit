import { red, common } from "@material-ui/core/colors";
import { darken, lighten } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

export type ThemeModeType = "dark" | "light";

export const darkTheme: ThemeOptions = {
  palette: {
    text: {
      primary: common.white
    },
    type: "dark",
    action: {
      active: common.white,
      selected: darken("#fffbfb", 0.4)
      // main: darken("#fffbfb", 0.4)
    },
    primary: {
      main: common.black
    },
    contrastThreshold: 3,
    secondary: {
      // main: "#6dc603",
      main: "#fffbfb"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#0e0e0e"
    }
  }
};

export const lightTheme: ThemeOptions = {
  palette: {
    action: {
      active: "#06692b",
      selected: lighten("#06692b", 0.6)
      // main: lighten("#c32a2a", 0.6)
    },
    primary: {
      main: "#06692b"
    },
    secondary: {
      main: "#30b443"
    },
    error: {
      main: red.A400
    },
    text: {
      secondary: common.white
    },
    background: {
      default: common.white
    }
  }
};
