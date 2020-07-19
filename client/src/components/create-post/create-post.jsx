import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  TextareaAutosize,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import PhotoIcon from "@material-ui/icons/Photo";
import styled from "styled-components";
import axios from "axios";
import { checkFile } from "../../utiles/file";
import { SetAlert } from "../../redux/alert/alert.actions";
import { CreatePostStart } from "../../redux/post/post.actions";
import { connect } from "react-redux";

const useStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: 600,
    margin: "10px auto",
    padding: 10,
  },
  media: {
    width: "100%",
    height: 325,
    borderRadius: "5px",
  },
});

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  border: none;
  outline: none;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 10px;
  resize: none;
`;

const CreatePost = ({ SetAlert, CreatePostStart, auth }) => {
  const classes = useStyles();
  const [photo, setPhoto] = React.useState(null);
  const [content, setContent] = React.useState("");

  const handlePost = async () => {
    if (!content.trim() && !photo) return;
    const formData = new FormData();
    if (photo) formData.append("photo", photo);
    if (content) formData.append("content", content);
    CreatePostStart(formData);
    setPhoto(null);
    setContent("");
  };

  const handleSetFile = (e) => {
    const { files } = e.target;
    try {
      const errors = checkFile(files[0]);

      if (!errors) {
        setPhoto(files[0]);
      } else {
        if (errors.size) {
          SetAlert({
            message: "Image size should be less than 10mb.",
            type: "warning",
          });
        }
        if (errors.type) {
          SetAlert({
            message: "Image type should be only jpg, jpeg and png.",
            type: "warning",
          });
        }
      }
    } catch {}
  };

  return (
    <Card className={classes.card}>
      <CardHeader title="Create post" />
      <CardContent style={{ padding: 10 }}>
        {photo ? (
          <img
            alt=""
            className={classes.media}
            src={URL.createObjectURL(photo)}
          />
        ) : null}
        <TextArea
          placeholder="Write..."
          id="content"
          label="Content"
          name="content"
          rows={3}
          variant="outlined"
          style={{ width: "100%", margin: "10px 0" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          variant="contained"
          size="small"
          startIcon={<PhotoIcon />}
          component="label"
        >
          Photo
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleSetFile}
          />
        </Button>
      </CardContent>

      <CardActions style={{ padding: 10 }}>
        <Button
          onClick={handlePost}
          variant="contained"
          color="primary"
          size="small"
          style={{ width: "100%" }}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, { SetAlert, CreatePostStart })(
  CreatePost
);
