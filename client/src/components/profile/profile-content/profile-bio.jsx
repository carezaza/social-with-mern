import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextareaAutosize,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { EditBio } from "../../../redux/profile/profile.actions";

const useStyles = makeStyles({
  card: {
    margin: "10px 0",
  },
});

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  border: none;
  outline: none;
  border-radius: 3px;
  padding: 10px;
  border: 1px solid #ccc;
  resize: none;
`;

const ProfileBio = ({ bio, user, auth, EditBio }) => {
  const classes = useStyles();
  const [edit, setEdit] = React.useState(false);
  const [bioContent, setBioContent] = React.useState(bio);

  const handleEdit = (e) => {
    if (edit) {
      EditBio(bioContent);
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const handleChange = (e) => {
    setBioContent(e.target.value);
  };

  const renderBio = (user) => {
    switch (user) {
      case auth.sub:
        return (
          <Fragment>
            <CardContent style={{ textAlign: "center" }}>
              {edit ? (
                <TextArea
                  placeholder="Write..."
                  id="content"
                  label="Content"
                  name="content"
                  rows={3}
                  variant="outlined"
                  maxLength={200}
                  value={edit && bioContent}
                  onChange={handleChange}
                />
              ) : (
                <Typography style={{ fontSize: 14 }}>
                  {bioContent ? bioContent : "..."}
                </Typography>
              )}
              {edit && (
                <Typography
                  color="textSecondary"
                  style={{ textAlign: "right", fontSize: 14 }}
                >
                  {bioContent ? bioContent.length : "0"}/200
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                variant={edit ? "contained" : "outlined"}
                color="primary"
                size="small"
                style={{ marginLeft: "auto" }}
                onClick={handleEdit}
              >
                {edit ? "Save" : "Edit bio"}
              </Button>
            </CardActions>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <CardContent style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: 14 }}>
                {bio ? bio : "..."}
              </Typography>
            </CardContent>
          </Fragment>
        );
    }
  };
  return <Card className={classes.card}>{renderBio(user)}</Card>;
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, { EditBio })(ProfileBio);
