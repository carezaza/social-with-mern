import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  CardHeader,
  TextField,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import PhotoIcon from "@material-ui/icons/Photo";
import styled from "styled-components";
import { checkFile } from "../../utiles/file";
import { SetAlert } from "../../redux/alert/alert.actions";
import { CreatePostStart } from "../../redux/post/post.actions";
import { connect } from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: 600,
    margin: "10px auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

const ContentField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const CreatePost = ({ SetAlert, CreatePostStart, auth }) => {
  const classes = useStyles();
  const { handleSubmit, register, setValue } = useForm();
  const [photo, setPhoto] = React.useState(null);

  const onSubmit = async (data) => {
    if (!data.content.trim() && !photo) return;
    const formData = new FormData();
    if (photo) formData.append("photo", photo);
    if (data.content) formData.append("content", data.content);
    CreatePostStart(formData);
    setPhoto(null);
    setValue("content", "");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title="Create post" />{" "}
        {photo && (
          <div style={{ textAlign: "right" }}>
            {" "}
            <Button
              variant="contained"
              size="small"
              startIcon={<ClearIcon />}
              style={{ margin: "10px 10px -50px 10px" }}
              onClick={() => setPhoto(null)}
            >
              Clear photo
            </Button>
          </div>
        )}
        {photo && (
          <CardMedia
            className={classes.media}
            image={photo && URL.createObjectURL(photo)}
            title="Paella dish"
          />
        )}
        <CardContent style={{ padding: 10 }}>
          <div
            style={{
              margin: 0,
              padding: 0,
              display: "flex",
              justifyContent: "space-between",
            }}
          ></div>
          {/* {photo ? (
          <div className={classes.media}>
            <img
              alt=""
              style={{ position: "absolute" }}
              src={URL.createObjectURL(photo)}
            />
          </div>
        ) : null} */}
          {/* <TextArea
          placeholder="Write..."
          id="content"
          label="Content"
          name="content"
          rows={3}
          variant="outlined"
          style={{ width: "100%", margin: "10px 0" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        /> */}
          <ContentField
            multiline
            rowsMax={10}
            rows={2}
            name="content"
            variant="outlined"
            inputRef={register}
            autoComplete="off"
            defaultValue=""
            placeholder="What's on your mind?"
          />
          <Button
            color="secondary"
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
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "100%" }}
          >
            Post
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, { SetAlert, CreatePostStart })(
  CreatePost
);
