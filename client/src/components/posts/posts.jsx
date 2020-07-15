import React from "react";
import { Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import CreatePost from "../create-post/create-post";
import PostItem from "../post-item/post-item";

const useStyles = makeStyles({});

const Posts = () => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
      <CreatePost />
      <PostItem />
    </div>
  );
};

export default Posts;
