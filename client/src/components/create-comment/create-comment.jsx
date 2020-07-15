import React from "react";
import styled from "styled-components";
import { Avatar, TextareaAutosize } from "@material-ui/core/";

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
  border-bottom: 1px solid #cccccc;
`;

const CreateComment = () => {
    
  const [comment, setComment] = React.useState('');
  const handleComment = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      return;
    }
    if (event.key === "Enter") {
      console.log("Submit comment");
    }
  };
  return (
    <CreateCommentContainer>
      <Avatar style={{ background: "green", width: 35, height: 35 }}>C</Avatar>
      <TextArea placeholder="Write..." onKeyPress={handleComment} value={comment} onChange={(e) => setComment(e.target.value)} />
    </CreateCommentContainer>
  );
};

export default CreateComment;
