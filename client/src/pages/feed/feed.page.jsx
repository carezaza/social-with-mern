import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import UserPanel from "../../components/user-panel/user-panel";
import Posts from "../../components/posts/posts";
import Profile from "../../components/profile/profile";
import { connect } from "react-redux";

const FeedContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: ${({ expand }) => (expand ? "100%" : "80%")};
  height: ${({ expand }) => (expand ? "100%" : "90%")};
  transition: all 0.3s ease;
  background-color: #e5e5e5;
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
  max-width: 900px;
  margin: auto;
  height: 100%;
`;

//match path is '/'
const Feed = ({ match, auth }) => {
  const [expand, setExpand] = useState(true);
  return (
    <FeedContainer expand={expand}>
      <UserPanel auth={auth} />
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
            <Route
              exact
              path={`${match.path}profile/:id`}
              component={Profile}
            />
          </Switch>
        </FeedBox>
      </Container>
    </FeedContainer>
  );
};

Feed.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps)(Feed);
