import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import UserPanel from "../../components/user-panel/user-panel";
import Posts from "../../components/posts/posts";

const FeedContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: ${({ expand }) => (expand ? "100%" : "80%")};
  height: ${({ expand }) => (expand ? "100%" : "90%")};
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  animation: expand 0.3s ease;
  @keyframes expand {
    from {
      transform: scale(0);
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const FeedBox = styled.div`
  width: 100%;
  height: 100%;
`;

//match path is '/'
const Feed = ({ match }) => {
  const [expand, setExpand] = useState(false);
  return (
    <FeedContainer expand={expand}>
      <UserPanel />
      <Container>
        <IconButton
          size="small"
          style={{ position: "fixed", padding: 0 }}
          onClick={() => setExpand(!expand)}
        >
          {expand ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <FeedBox>
          <Switch>
            <Route exact path={`${match.path}`} component={Posts} /> 
          </Switch>
        </FeedBox>
      </Container>
    </FeedContainer>
  );
};


export default Feed;
