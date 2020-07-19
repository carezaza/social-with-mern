import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Card,
  CardHeader,
  Button,
  IconButton,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";

import EditPhoto from "../edit-photo/edit-photo";
import EditSocial from "../edit-social/edit-social";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
    margin: "auto",
  },
});

const EditProfile = ({ open, handleClose, profile }) => {
  const [edit, setEdit] = React.useState("photo");
  const classes = useStyles();

  return (
    <Modal open={open} style={{ display: "flex" }}>
      <Card className={classes.root}>
        <CardHeader
          title="Edit Profile"
          subheader={
            <div>
              <Button
                variant="outlined"
                style={{
                  borderRadius: 0,
                  textTransform: "none",
                  background: edit === "photo" ? "#ccc" : "white",
                }}
                onClick={() => setEdit("photo")}
              >
                Photo
              </Button>
              <Button
                variant="outlined"
                style={{
                  borderRadius: 0,
                  textTransform: "none",
                  background: edit === "social" ? "#ccc" : "white",
                }}
                onClick={() => setEdit("social")}
              >
                Social
              </Button>
            </div>
          }
          action={
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        {edit === "photo" && (
          <EditPhoto profile={profile} handleClose={handleClose} />
        )}
        {edit === "social" && (
          <EditSocial social={profile.social} handleClose={handleClose} />
        )}
      </Card>
    </Modal>
  );
};

export default EditProfile;
