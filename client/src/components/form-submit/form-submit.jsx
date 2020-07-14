import React from "react";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

const FormSubmitContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  width: 300px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  animation: expand 0.3s ease;
  @keyframes expand {
    from {
      transform: scale(0);
    }
  }
`;

const FormSubmit = ({ handleClose, children, handleSubmit }) => {
  return (
    <FormSubmitContainer onSubmit={handleSubmit}>
      <IconButton
        size="small"
        style={{ width: 32, marginLeft: "auto" }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </FormSubmitContainer>
  );
};

export default FormSubmit;
