import React, { Fragment } from "react";
import {
  CardActions,
  CardContent,
  Button,
  IconButton,
} from "@material-ui/core/";
import styled from "styled-components";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@material-ui/core/";
import { EditPhotoStart } from "../../redux/profile/profile.actions";
import { connect } from "react-redux";
import { SetAlert } from "../../redux/alert/alert.actions";
import { checkFile } from "../../utiles/file";

const Background = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  background-image: ${({ Image }) => (Image ? `url(${Image})` : ``)};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 5px;
`;

const AvatarProfile = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  border-radius: 50%;
  border: 2px solid #ccc;
`;

const EditPhoto = ({
  handleClose,
  profile,
  EditPhotoStart,
  isPending,
  SetAlert,
}) => {
  const [pictures, setPictures] = React.useState({
    avatar: null,
    background: null,
  });
  const { avatar, background } = pictures;
  const handleChange = (event) => {
    const { name, files } = event.target;

    try {
      const errors = checkFile(files[0]);

      if (!errors) {
        setPictures((s) => ({ ...s, [name]: files[0] }));
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
  const handleSave = async () => {
    if (avatar || background) {
      const formData = new FormData();
      if (avatar) formData.append("avatar", avatar);
      if (background) formData.append("background", background);
      EditPhotoStart({ formData });
    } else {
      handleClose();
    }
  };
  return (
    <Fragment>
      <CardContent>
        <Background
          Image={
            background ? URL.createObjectURL(background) : profile.background
          }
        >
          <div style={{ textAlign: "right" }}>
            <IconButton
              color="secondary"
              component="label"
              style={{
                background: "rgba(0,0,0,0.3)",
                zIndex: 1,
                padding: 5,
              }}
            >
              <PhotoCameraIcon />
              <input
                type="file"
                name="background"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </IconButton>
          </div>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton
              color="secondary"
              component="label"
              style={{
                margin: "auto auto -35px 80px",
                background: "rgba(0,0,0,0.3)",
                zIndex: 1,
                padding: 5,
              }}
            >
              <PhotoCameraIcon />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </IconButton>
            <AvatarProfile
              src={avatar ? URL.createObjectURL(avatar) : profile.avatar}
              style={{ margin: "auto auto -30px 10px" }}
            />
          </div>
        </Background>
      </CardContent>

      <CardActions>
        <div style={{ marginLeft: "auto" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSave}
            disabled={isPending}
          >
            Save Photo
          </Button>
          <Button size="small" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </CardActions>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isPending: state.profileReducer.isPending,
});

export default connect(mapStateToProps, { EditPhotoStart, SetAlert })(
  EditPhoto
);
