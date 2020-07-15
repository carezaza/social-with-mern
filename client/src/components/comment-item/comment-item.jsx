import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: "#e5e5e5",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
    margin: "0 5px",
  },
}));

const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const CommentItem = () => {
  const classes = useStyles();
  return (
    <CommentItemContainer>
      <Avatar style={{ background: "red", width: 35, height: 35 }}>H</Avatar>
      <div className={classes.root}> Content</div>
    </CommentItemContainer>
  );
};

export default CommentItem;
