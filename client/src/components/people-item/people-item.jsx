import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core/";

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: primary;
  width: 100%;
  &:active {
    color: inherit;
    background-color: inherit;
  }
`;

const PeopleItem = ({ profile, handleClose }) => {
  return (
    // <Modal
    //   style={{ display: "flex", flexGrow: 1 }}
    //   open={open}
    //   onClose={handleClose}
    // >
    //   <List dense className={classes.root}>

    <LinkStyle to={`/profile/${profile.user}`}>
      <ListItem onClick={handleClose && handleClose} button>
        <ListItemAvatar>
          <Avatar src={profile.avatar && profile.avatar} />
        </ListItemAvatar>
        <ListItemText primary={`${profile.firstName} ${profile.lastName}`} />
      </ListItem>
    </LinkStyle>

    //   </List>
    // </Modal>
  );
};

export default PeopleItem;
