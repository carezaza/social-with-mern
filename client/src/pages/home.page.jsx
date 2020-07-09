import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import LoginForm from "../components/login-form/login-form";
import RegisterForm from "../components/register-form/register-form";
import BackgroundImage from '../assets/bg-home1920.png'

const HomePageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundImage});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: auto;
  padding: 15px 20px;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  animation: expand 0.2s ease;
  @keyframes expand {
    from {
      transform: scale(0);
    }
  }
`;

const HomePage = () => {
  const [showForm, setShowForm] = useState("");
  return (
    <HomePageContainer>
      <Container>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {renderForm(showForm, setShowForm)}
        </div>
      </Container>
    </HomePageContainer>
  );
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

export default HomePage;
