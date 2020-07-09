import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./pages/home.page";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  return (
    <Fragment>
      <MuiThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </MuiThemeProvider>
    </Fragment>
  );
}

export default App;
