import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
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
  max-width: 600px;
  flex-direction: column;
`;

const ProfileContent = ({ profile, auth, posts }) => {
  return (
    <ProfileContentContainer>
      <ContentLeft>
        <ProfileBio bio={profile.bio} user={profile.user} />
        <FollowPost
          profileUser={profile.user}
          following={profile.following}
          followers={profile.followers}
        />
      </ContentLeft>
      <ContentRight>
        {profile.user === auth.sub && <CreatePost />}

        {posts.length > 0 ? (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex" }}>
            <Typography
              variant="h5"
              component="h4"
              align="center"
              style={{ margin: "auto" }}
            >
              No posts.
            </Typography>
          </div>
        )}
      </ContentRight>
    </ProfileContentContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps)(ProfileContent);
