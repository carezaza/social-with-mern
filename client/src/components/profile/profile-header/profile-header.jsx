import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Avatar, Typography, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import SocialProfile from "./social-profile";
import EditProfile from "../../edit-profile/edit-profile";
import { FollowStart } from "../../../redux/profile/profile.actions";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: "15px 15px -30px 15px",
    border: "2px solid white",
  },
  button: {
    marginBottom: "-15px",
    marginRight: "10px",
    border: "1px solid white",
    height: 30,
    background: "white",
  },
}));

const ProfileBackground = styled.div`
  display: flex;
  background-color: white;
  margin-top: -1px;
  height: 380px;
  background-image: ${({ Image }) => (Image ? `url(${Image})` : null)};
  background-position: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-radius: 0 0 5px 5px;

  // @media (min-aspect-ratio: 16/9) {
  //   background-image: ${({ Image }) => (Image ? `url(${Image})` : null)};
  // }
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

const ProfileHeader = ({ profile, auth, FollowStart }) => {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = React.useState(false);
  return (
    <ProfileBackground Image={profile.background && profile.background}>
      <Container>
        <Avatar
          src={profile.avatar && profile.avatar}
          className={classes.avatar}
        />
      </Container>
      <Container>
        <Typography
          variant="h6"
          align="center"
          style={{
            padding: "0 10px",
            background: "#ccc",
            borderRadius: " 5px 5px 0 0",
          }}
        >
          {profile.firstName + " " + profile.lastName}
        </Typography>
      </Container>
      <ButtonContainer>
        <SocialProfile social={profile.social} />
        {profile.user === auth.sub ? (
          <Fragment>
            <Button
              variant="contained"
              endIcon={<EditIcon />}
              className={classes.button}
              onClick={() => setOpenEdit(true)}
            >
              Edit
            </Button>
            <EditProfile
              profile={profile}
              open={openEdit}
              handleClose={() => setOpenEdit(false)}
            />
          </Fragment>
        ) : (
          <Button
            variant="contained"
            endIcon={
              profile.followers.find((f) => f.user === auth.sub) ? (
                <DoneIcon />
              ) : (
                <AddIcon />
              )
            }
            className={classes.button}
            onClick={() => FollowStart(profile.user)}
          >
            Follow
          </Button>
        )}
      </ButtonContainer>
    </ProfileBackground>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, { FollowStart })(ProfileHeader);
