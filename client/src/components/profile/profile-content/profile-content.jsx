import React, {
  useRef,
  useState,
  useCallback,
  Fragment,
  useEffect,
} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ProfileBio from "./profile-bio";
import FollowPost from "./follow-post";
import CreatePost from "../../create-post/create-post";
import PostItem from "../../post-item/post-item";
import {
  FetchPostsProfileStart,
  ClearPosts,
  SetHasMore,
} from "../../../redux/post/post.actions";

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

const ProfileContent = ({
  profile,
  auth,
  hasMore,
  posts,
  FetchPostsProfileStart,
  SetHasMore,
  ClearPosts,
}) => {
  const { user } = profile;
  const [page, setPage] = useState(0);
  const [el, setEl] = useState(null);

  const load = useCallback(() => {
    FetchPostsProfileStart(user, page);
    setPage((p) => p + 1);
  }, [page, user, FetchPostsProfileStart]);

  const loader = useRef(load);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loader.current();
        }
      },
      { threshold: 1 }
    )
  );

  useEffect(() => {
    loader.current = load;
  }, [load]);

  useEffect(() => {
    const currentEl = el;
    const currentObserver = observer.current;

    if (currentEl) {
      currentObserver.observe(currentEl);
    }

    return () => {
      if (currentEl) currentObserver.unobserve(currentEl);
    };
  }, [el]);

  useEffect(() => {
    return () => {
      ClearPosts();
      SetHasMore(true);
    }
  },[ClearPosts,SetHasMore]);

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
        {posts.length > 0 && (
          <Fragment>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </Fragment>
        )}
        {hasMore && (
          <div ref={setEl} style={{ margin: "10px  auto" }}>
            Loading...
          </div>
        )}

        {!hasMore && posts.length < 1 && (
          <div style={{ margin: "10px auto", fontSize: 16 }}>No posts.</div>
        )}
      </ContentRight>
    </ProfileContentContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
  posts: state.postReducer.posts,
  hasMore: state.postReducer.hasMore,
});

export default connect(mapStateToProps, {
  FetchPostsProfileStart,
  ClearPosts,
  SetHasMore,
})(ProfileContent);
