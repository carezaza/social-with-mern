import React, { useEffect } from "react";
import CreatePost from "../create-post/create-post";
import PostItem from "../post-item/post-item";
import { connect } from "react-redux";
import { FetchPostsHomeStart } from "../../redux/post/post.actions";

const Posts = ({ FetchPostsHomeStart, posts }) => {
  useEffect(() => {
    FetchPostsHomeStart();
  }, [FetchPostsHomeStart]);

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
      <CreatePost />
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <PostItem key={post._id} post={post} />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
});

export default connect(mapStateToProps, { FetchPostsHomeStart })(Posts);
