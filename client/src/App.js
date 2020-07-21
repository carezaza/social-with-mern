import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./pages/home/home.page";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import AlertMessage from "./components/alert/alert";
import styled from "styled-components";
import BackgroundImage from "./assets/bg-home1920.png";
import { LogoutStart, LoginIfRefresh } from "./redux/auth/auth.actions";
import jwt_decode from "jwt-decode";
import store from "./redux/store";
import setAuthToken from "./utiles/authToken";
import axios from "axios";
import { SetAlert } from "./redux/alert/alert.actions";


if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
  const decoded = jwt_decode(localStorage.jwt);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    axios
      .post("/api/auth/resetToken")
      .then((res) => {
        const decodedRefreshToken = jwt_decode(token);
        setAuthToken(false);
        localStorage.removeItem("jwt");
        const token = res.headers["authorization"];
        localStorage.setItem("jwt", token);
        setAuthToken(token);
        store.dispatch(LoginIfRefresh(decodedRefreshToken));
        SetAlert({ message: res.data, type: "success" });
      })
      .catch((err) => {
        store.dispatch(LogoutStart());
      });
  } else {
    store.dispatch(LoginIfRefresh(decoded));
  }
}

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

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundImage});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  margin-top: 64px !important;
`;

function App() {
  return (
    <Fragment>
      <AlertMessage />
      <AppContainer>
        <Container>
          <MuiThemeProvider theme={theme}>
            <Header />
            <Switch>
              <Route path="/" component={HomePage} />
            </Switch>
          </MuiThemeProvider>
        </Container>
      </AppContainer>
    </Fragment>
  );
}

export default App;
