import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import LoginForm from "../../components/login-form/login-form";
import RegisterForm from "../../components/register-form/register-form";

import Spinner from "../../components/spinner/spinner";
import Feed from "../feed/feed.page";

const HomePageContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px);
`;

const ButtonContainer = styled.div`
  animation: expand 0.3s ease;
  @keyframes expand {
    from {
      transform: scale(0);
    }
  }
`;

const HomePage = ({ isPendingAuth, match, auth }) => {
  const [showForm, setShowForm] = useState("");

  return (
    <HomePageContainer>
      {isPendingAuth ? (
        <Spinner />
      ) : (
        renderContent({ auth, showForm, setShowForm, match })
      )}
    </HomePageContainer>
  );
};

const renderContent = ({ auth, showForm, setShowForm, match }) => {
  if (auth) {
    return <Feed match={match} />;
  } else {
    return (
      <div style={{ margin: "auto" }}>{renderForm(showForm, setShowForm)}</div>
    );
  }
};

const renderForm = (showform, setShowForm) => {
  switch (showform) {
    case "Login":
      return <LoginForm handleClose={() => setShowForm("")} />;
    case "Register":
      return <RegisterForm handleClose={() => setShowForm("")} />;
    default:
      return (
        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 20px", fontWeight: 900, color: "#fff" }}
            onClick={() => setShowForm("Login")}
          >
            Login
          </Button>
          <Button
            style={{ padding: "10px 20px", fontWeight: 900, color: "#fff" }}
            onClick={() => setShowForm("Register")}
          >
            Register
          </Button>
        </ButtonContainer>
      );
  }
};

const mapStateToProps = (state) => ({
  isPendingAuth: state.authReducer.isPending,
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps)(HomePage);
