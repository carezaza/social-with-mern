import React from "react";
import CreatePost from "../create-post/create-post";
import PostItem from "../post-item/post-item";



const Posts = () => {
 
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
      <CreatePost />
      <PostItem />
    </div>
  );
};

export default Posts;
