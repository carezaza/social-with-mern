import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Avatar,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core/";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import styled from "styled-components";

import CommentItem from "../comment-item/comment-item";
import CreateComment from "../create-comment/create-comment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 600,
    margin: "10px auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "black",
  },
}));

const ButtonStyle = styled.button`
  outline: none;
  border: none;
  color: grey;
  background: transparent;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonName = styled.button`
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  padding:0;
  margin:0;
  &:hover {
    text-decoration: underline;
  }
`;

const PostItem = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    console.log("Like start or unlike start");
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={<ButtonName>John Smith</ButtonName>}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="https://www.sony.co.th/image/bc6d25fa6371c2899ce704a2bed7614c?fmt=png-alpha&wid=960"
        title="ImagePost"
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>

      <div style={{ textAlign: "right", marginRight: 20 }}>
        <ButtonStyle aria-label="likes">
          <Typography>0 Likes</Typography>{" "}
        </ButtonStyle>

        <ButtonStyle aria-label="Comments" onClick={handleExpandClick}>
          <Typography>0 Comments</Typography>
        </ButtonStyle>
      </div>

      <CardActions disableSpacing>
        <IconButton style={{ borderRadius: 0 }} onClick={handleLike}>
          <ThumbUpIcon />
          <Typography style={{ marginLeft: 5 }}>Like</Typography>
        </IconButton>
        <IconButton style={{ borderRadius: 0 }} onClick={handleExpandClick}>
          <CommentIcon />
          <Typography style={{ marginLeft: 5 }}>Comment</Typography>
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CreateComment />
        <CommentItem />
      </Collapse>
    </Card>
  );
};

export default PostItem;
