import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";

import AppContext from "./AppContext";
import MainApp from "./MainApp";
import { lightTheme, darkTheme } from "./theme/themes";

import GlobalStyles from "./theme/GlobalStyles";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  window.matchMedia = null;
  const darkMode = useDarkMode(true);

  return (
    <AppContext.Provider value={{ darkMode }}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />

        <div className="App">
          <BrowserRouter>
            <MainApp />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
