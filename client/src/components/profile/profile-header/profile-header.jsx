import React from "react";
import styled from "styled-components";
import { Avatar, Typography, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';

import SocialProfile from "./social-profile";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: "15px 15px -30px 15px",
    border: "2px solid white",
  },
  button: {
    marginBottom: "-15px",
    border: "1px solid white",
    height: 30
  },
}));

const ProfileBackground = styled.div`
  display: flex;
  background-color: white;
  height: 250px;
  border: 1px solid grey;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
  margin-top: auto;
  margin-right: 10px;
`;

const Container = styled.div`
  margin-top: auto;
  display: flex;
  align-items: flex-end;
`;

const ProfileHeader = () => {
  const classes = useStyles();
  return (
    <ProfileBackground>
      <Container>
        <Avatar
          alt="ProfilePicture"
          className={classes.avatar}
        >
          Image
        </Avatar>
      </Container>
      <Container>
        <Typography variant="h6" align="center">
          John Smith
        </Typography>
      </Container>
      <ButtonContainer>
        <SocialProfile />
        <Button
          variant="contained"
          color="secondary"
          endIcon={<EditIcon />}
          className={classes.button}s
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<AddIcon />}
          className={classes.button}
        >
          Follow
        </Button>
      </ButtonContainer>
    </ProfileBackground>
  );
};

export default ProfileHeader;
