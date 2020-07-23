import React, { useEffect } from "react";
import styled from "styled-components";
import ProfileHeader from "./profile-header/profile-header";
import ProfileContent from "./profile-content/profile-content";
import { CircularProgress, Typography } from "@material-ui/core/";
import { connect } from "react-redux";
import {
  FetchProfileStart,
  ClearProfile,
} from "../../redux/profile/profile.actions";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = ({
  isPending,
  profile,
  FetchProfileStart,
  match,
  ClearProfile,
}) => {
  useEffect(() => {
    FetchProfileStart(match.params.id);

    return () => {
      ClearProfile();
    };
  }, [match.params.id, FetchProfileStart, ClearProfile]);

  if (isPending && !profile)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          zIndex: 1,
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    );

  if (!isPending && !profile)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography align="center" variant="h5" component="h2">
          Profile not found.
        </Typography>
      </div>
    );
  return (
    profile && (
      <ProfileContainer>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </ProfileContainer>
    )
  );
};

const mapStateToProps = (state) => ({
  isPending: state.profileReducer.isPending,
  profile: state.profileReducer.profile,
});

export default connect(mapStateToProps, {
  FetchProfileStart,
  ClearProfile,
})(Profile);
