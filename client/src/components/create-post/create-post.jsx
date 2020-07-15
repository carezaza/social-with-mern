import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  TextareaAutosize,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import PhotoIcon from "@material-ui/icons/Photo";
import styled from "styled-components";

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

const CreatePost = () => {
  const classes = useStyles();
  const [image, setImage] = React.useState(null);
  const [content, setContent] = React.useState("");

  const handlePost = () => {
    if (!content) return;
    console.log('create post start... ');
  };

  return (
    <Card className={classes.card}>
      <CardHeader title="Create post" />
      <CardContent style={{ padding: 10 }}>
        {image ? (
          <img className={classes.media} src={URL.createObjectURL(image)} />
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
          color="secondary"
          size="small"
          startIcon={<PhotoIcon />}
          component="label"
        >
          Photo
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
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

export default CreatePost;
