import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
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
  Menu,
  MenuItem,
  List,
  Modal,
} from "@material-ui/core/";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import styled from "styled-components";
import CommentItem from "../comment-item/comment-item";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CreateComment from "../create-comment/create-comment";
import DialogOkCancel from "../dialog-ok-cancel/dialog-ok-cancel";
import { connect } from "react-redux";
import {
  DeletePost,
  LikeStart,
  LikeSuccess,
  CommentSuccess,
  DeleteCommentSuccess,
} from "../../redux/post/post.actions";
import PeopleItem from "../people-item/people-item";
import io from "socket.io-client";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en)

const socket = io("https://social-with-mern.herokuapp.com/");
//https://social-with-mern.herokuapp.com/
//http://localhost:5000/

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
  ListStlye: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 0,
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

  list: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 400,
    height: "100%",
    maxHeight: 400,
    margin: "auto",
    padding: 10,
    overflowY: "auto",
    background: "white",
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
  padding: 0;
  margin: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const PostItem = ({
  post,
  auth,
  DeletePost,
  LikeStart,
  LikeSuccess,
  DeleteCommentSuccess,
  CommentSuccess,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDel, setOpenDel] = React.useState(false);
  const [openLike, setOpenLike] = React.useState(false);
  const timeAgo = new TimeAgo('en-US')
  const dateTime = timeAgo.format(new Date(post.postedAt));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    LikeStart(post._id);
  };

  const handleDelete = () => {
    DeletePost(post._id);
    setOpenDel(false);
  };

  useEffect(() => {
    socket.on("post", ({ action, p }) => {
      if (action === "like") LikeSuccess(p);
      if (action === "delete") DeleteCommentSuccess(p);
      if (action === "comment") CommentSuccess(p);
    });
  }, [LikeSuccess, DeleteCommentSuccess, CommentSuccess]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={post.profile.avatar}
            alt={post.profile.firstName + " " + post.profile.lastName}
          />
        }
        title={
          <Link to={`/profile/${post.user}`}>
            <ButtonName>
              {post.profile.firstName + " " + post.profile.lastName}
            </ButtonName>
          </Link>
        }
        subheader={dateTime}
        action={
          post.user === auth.sub && (
            <Fragment>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                style={{ marginTop: 35, marginLeft: -40 }}
              >
                <MenuItem onClick={() => setOpenDel(true)}>Delete</MenuItem>
              </Menu>
              <DialogOkCancel
                title="Delete Post"
                content="Are you sure to delete this post?"
                open={openDel}
                handleCancel={() => setOpenDel(false)}
                handleOk={handleDelete}
              />
            </Fragment>
          )
        }
      />
      {post.photo && (
        <CardMedia
          className={classes.media}
          image={post.photo}
          title="ImagePost"
        />
      )}

      {post.content && (
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            {post.content}
          </Typography>
        </CardContent>
      )}

      <div style={{ textAlign: "right", marginRight: 20 }}>
        {post.likes.length > 0 && (
          <Fragment>
            <ButtonStyle aria-label="likes" onClick={() => setOpenLike(true)}>
              <Typography>{post.likes.length} Likes</Typography>{" "}
            </ButtonStyle>
            <Modal
              style={{ display: "flex", flexGrow: 1 }}
              open={openLike}
              onClose={() => setOpenLike(false)}
            >
              <List dense className={classes.list}>
                {post.likes.map((l) => (
                  <PeopleItem key={l._id} profile={l} />
                ))}
              </List>
            </Modal>
          </Fragment>
        )}

        {post.comments.length > 0 && (
          <ButtonStyle aria-label="Comments" onClick={handleExpandClick}>
            <Typography>{post.comments.length} Comments</Typography>
          </ButtonStyle>
        )}
      </div>

      <CardActions disableSpacing>
        <IconButton style={{ borderRadius: 0 }} onClick={handleLike}>
          <FavoriteIcon
            color={
              post.likes.find((like) => like.user === auth.sub) && "secondary"
            }
          />
          <Typography style={{ marginLeft: 5 }}>Like</Typography>
        </IconButton>
        <IconButton style={{ borderRadius: 0 }} onClick={handleExpandClick}>
          <CommentIcon />
          <Typography style={{ marginLeft: 5 }}>Comment</Typography>
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CreateComment postId={post._id} />
        <List className={classes.ListStlye}>
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
              postUser={post.user}
            />
          ))}
        </List>
      </Collapse>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, {
  DeletePost,
  LikeStart,
  LikeSuccess,
  DeleteCommentSuccess,
  CommentSuccess,
})(PostItem);
