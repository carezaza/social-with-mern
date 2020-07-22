import React from "react";
import styled from "styled-components";
import { Avatar, TextField } from "@material-ui/core/";
import { CreateCommentStart } from "../../redux/post/post.actions";
import { connect } from "react-redux";

const CreateCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const ContentField = styled(TextField)`
  width: 100%;
  margin: 0 10px;
  background-color: #e5e5e5;
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
        style={{ width: 35, height: 35 }}
      />

      <ContentField
        multiline
        rowsMax={10}
        rows={1}
        name="comment"
        variant="outlined"
        autoComplete="off"
        value={comment}
        onKeyPress={handleComment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What's on your mind?"
        size="small"
      />
    </CreateCommentContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, { CreateCommentStart })(CreateComment);
