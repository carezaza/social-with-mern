import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <CircularProgress />
    </SpinnerContainer>
  );
};

export default Spinner;
