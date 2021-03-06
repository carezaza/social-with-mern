import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Avatar,
  Typography,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core/";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DialogOkCancel from "../dialog-ok-cancel/dialog-ok-cancel";
import { connect } from "react-redux";
import { DeleteComment } from "../../redux/post/post.actions";
import TimeAgo from "javascript-time-ago";

const LinkStyle = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: inherit;
  }
`;

const CommentItem = ({ postId, postUser, comment, auth, DeleteComment }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDel, setOpenDel] = React.useState(false);
  const timeAgo = new TimeAgo("en-US");
  const dateTime = timeAgo.format(new Date(comment.commentedAt));

  const handleDelete = (commentId) => {
    DeleteComment(postId, commentId);
    setOpenDel(false);
    setAnchorEl(null);
  };

  const renderButtonDelete = (userId, postUser, commentUser) => {
    if (userId === postUser || userId === commentUser) {
      return (
        <Fragment>
          <IconButton
            aria-label="settings"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={{ padding: 0 }}
          >
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
          </Menu>{" "}
        </Fragment>
      );
    }

    return null;
  };

  if (!comment) return null;
  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={comment.avatar && comment.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <LinkStyle to={`/profile/${comment.user}`}>
                  <Typography
                    style={{ fontWeight: "bold", fontSize: 14 }}
                    color="primary"
                  >
                    {`${comment.firstName} ${comment.lastName}`}
                  </Typography>{" "}
                </LinkStyle>{" "}
                <Typography
                  style={{ fontSize: 12, margin: "0 5px" }}
                  color="textSecondary"
                >
                  {dateTime}
                </Typography>
              </div>
              {renderButtonDelete(auth.sub, postUser, comment.user)}{" "}
              <DialogOkCancel
                title="Delete Comment"
                content="Are you sure to delete this comment?"
                open={openDel}
                handleCancel={() => setOpenDel(false)}
                handleOk={() => handleDelete(comment._id)}
              />
            </div>
          }
          secondary={
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              style={{ wordBreak: "break-all" }}
            >
              {comment.content}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />{" "}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, { DeleteComment })(CommentItem);
