import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,

} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    margin: '10px 0'
  },
});

const ProfileBio = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent style={{ textAlign: "center" }}>
        <Typography>...</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ marginLeft: "auto" }}
        >
          Add bio
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileBio;
