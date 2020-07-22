import React, { useEffect, useRef, useState, useCallback } from "react";
import CreatePost from "../create-post/create-post";
import PostItem from "../post-item/post-item";
import { connect } from "react-redux";
import { FetchPostsHomeStart, ClearPosts, SetHasMore } from "../../redux/post/post.actions";

const Posts = ({ FetchPostsHomeStart, posts, hasMore, ClearPosts, SetHasMore }) => {
  const [page, setPage] = useState(0);

  const load = useCallback(() => {
    FetchPostsHomeStart(page);
    setPage(page + 1);
  }, [page, FetchPostsHomeStart]);

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
  const [el, setEl] = useState(null);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <CreatePost />
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <PostItem key={post._id} post={post} />)}

      {hasMore && (
        <div ref={setEl} style={{ margin: "10px  auto" }}>
          Loading...
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  hasMore: state.postReducer.hasMore,
});

export default connect(mapStateToProps, { FetchPostsHomeStart,ClearPosts,SetHasMore })(Posts);
