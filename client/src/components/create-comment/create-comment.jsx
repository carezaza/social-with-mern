import React from "react";
import styled from "styled-components";
import { Avatar, TextareaAutosize } from "@material-ui/core/";
import { CreateCommentStart } from "../../redux/post/post.actions";
import { connect } from "react-redux";

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin: 0 10px !important;
  background-color: #cccccc;
  font-size: 16px;
  font-family: inherit;
  border: none;
  outline: none;
  border-radius: 15px;
  padding: 10px;
  resize: none;
`;

const CreateCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const CreateComment = ({ postId, CreateCommentStart, auth }) => {
  const [comment, setComment] = React.useState("");
  const handleComment = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (!comment.trim()) {
        return;
      }
      CreateCommentStart(postId, comment);
      setComment("");
    }
  };
  return (
    <CreateCommentContainer>
      <Avatar
        src={auth.avatar && auth.avatar}
        style={{ background: "green", width: 35, height: 35 }}
      />
      <TextArea
        placeholder="Write..."
        onKeyPress={handleComment}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </CreateCommentContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, { CreateCommentStart })(CreateComment);
