import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core/";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SettingsIcon from "@material-ui/icons/Settings";
import WebIcon from "@material-ui/icons/Web";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "10px auto",
  },
}));

const UserPanelContainer = styled.div`
  padding: 10px;
  width: ${({ expand }) => (expand ? "300px" : "50px")};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  background-color: ${({ expand }) => (expand ? "white" : "transparent")};
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

const UserPanel = ({ auth }) => {
  const classes = useStyles();
  const [expand, setExpand] = useState(true);
  return (
    <UserPanelContainer expand={expand}>
      <IconButton
        size="small"
        style={{ marginLeft: "auto" }}
        onClick={() => setExpand(!expand)}
      >
        {expand ? <ArrowBackIcon /> : <ArrowForwardIcon />}
      </IconButton>
      {expand && (
        <Fragment>
          <Avatar
            alt="avatarProfile"
            src={auth.avatar && auth.avatar}
            className={classes.avatar}
          />
          <LinkStyle to={`/profile/${auth.sub}`}>
            <Typography align="center" style={{ textTransform: "capitalize" }}>
              Hello, {auth.firstName + " " + auth.lastName}
            </Typography>
          </LinkStyle>

          <List style={{ marginTop: "10px" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <ListItem button>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText primary="News Feed" />
              </ListItem>
            </Link>
            <Link
              to={`/profile/${auth.sub}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
            </Link>
            <Link
              to="/settings"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </Link>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Fragment>
      )}
    </UserPanelContainer>
  );
};

export default UserPanel;
