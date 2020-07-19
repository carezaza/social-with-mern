import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ProfileBio from "./profile-bio";
import FollowPost from "./follow-post";
import CreatePost from "../../create-post/create-post";
import PostItem from "../../post-item/post-item";

const ProfileContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 250px;
`;

const ContentRight = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ProfileContent = ({ profile, auth, posts }) => {
  return (
    <ProfileContentContainer>
      <ContentLeft>
        <ProfileBio bio={profile.bio} user={profile.user} />
        <FollowPost
          following={profile.following}
          followers={profile.followers}
          posts={posts.length}
        />
      </ContentLeft>
      <ContentRight>
        {profile.user === auth.sub && <CreatePost />}

        {posts.length > 0 &&
          posts.map((post) => <PostItem key={post._id} post={post} />)}
      </ContentRight>
    </ProfileContentContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps)(ProfileContent);
