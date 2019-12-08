import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { useContext, useCallback } from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apollo"; // getApolloClient
import "./css/App.css";
import RouterComponent from "./router";

import { darkTheme, lightTheme } from "./theme";
import { ThemeContext, ThemeContextProvider } from "./context/themeContext";
import { SongsContextProvider } from "./context/songContext";

const WilfredAppThemeContainer = () => {
  const { themeMode } = useContext(ThemeContext);

  const getTheme = useCallback(() => {
    if (themeMode === "light") {
      return createMuiTheme(lightTheme);
    } else {
      return createMuiTheme(darkTheme);
    }
  }, [themeMode]);

  let theme = getTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterComponent />
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <ApolloProvider client={client}>
        <SongsContextProvider>
          <WilfredAppThemeContainer />
        </SongsContextProvider>
      </ApolloProvider>
    </ThemeContextProvider>
  );
};

export default App;
