import React from "react";
import styled from "styled-components";

import ProfileBio from "./profile-bio";
import FollowPost from "./follow-post";
import CreatePost from "../../create-post/create-post";
import PostItem from '../../post-item/post-item'

const ProfileContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 250px;
`;

const ContentRight = styled.div`
  display:flex;
  flex-direction: column;
`;

const ProfileContent = () => {
  return (
    <ProfileContentContainer>
      <ContentLeft>
        <ProfileBio />
        <FollowPost />
      </ContentLeft>
      <ContentRight>
        <CreatePost />
        <PostItem/>
      </ContentRight>
    </ProfileContentContainer>
  );
};

export default ProfileContent;
