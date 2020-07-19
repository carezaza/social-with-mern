import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Alert, AlertTitle } from "@material-ui/lab";
import { connect } from "react-redux";

const AlertContainer = styled.div`
  position: fixed;
  top: 70px;
  right: 10px;
  z-index: 99999999;
`;

const AlertBox = styled(Alert)`
  animation: slide 0.5s ease;
  @keyframes slide {
    from {
      transform: translateY(200%);
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  alert: {
    margin: 10,
    minWidth: 280,
    backgroundColor: "white",
    maxWidth: 280,
  },
}));

const AlertMessage = ({ alerts }) => {
  const classes = useStyles();
  if (alerts.length < 1) return null;
  return (
    <AlertContainer>
      {alerts.map((alert) => (
        <AlertBox
          key={alert.id}
          variant="outlined"
          severity={alert.type}
          className={classes.alert}
        >
          <AlertTitle style={{ textTransform: "capitalize" }}>
            {alert.type}
          </AlertTitle>
          <strong>{alert.message}</strong>
        </AlertBox>
      ))}
    </AlertContainer>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alertReducer.alerts,
});

export default connect(mapStateToProps)(AlertMessage);
