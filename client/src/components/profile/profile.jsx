import React from "react";
import styled from "styled-components";
import ProfileHeader from "./profile-header/profile-header";
import ProfileContent from './profile-content/profile-content'

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileHeader />
      <ProfileContent/>
    </ProfileContainer>
  );
};

export default Profile;
