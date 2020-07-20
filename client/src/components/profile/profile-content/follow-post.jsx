import React from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Modal,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import { connect } from "react-redux";
import PeopleItem from "../../people-item/people-item";

const useStyles = makeStyles({
  card: {
    margin: "10px 0",
  },
  list: {
    display: "flex",
    flexDirection:'column',
    width: "100%",
    maxWidth: 400,
    height: "100%",
    maxHeight: 400,
    margin: "auto",
    padding: 10,
    overflowY: "auto",
    background: "white",
  },
});

const FollowPost = ({ following, followers, profileUser, auth }) => {
  const [open, setOpen] = React.useState("");

  const handleClose = () => {
    setOpen("");
  };
  const classes = useStyles();
  return (
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent style={{ padding: 10 }}>
        <List>
          <ListItem
            button={profileUser === auth.sub ? true : false}
            onClick={() => setOpen("followers")}
          >
            <ListItemIcon>
              <PeopleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText secondary={`Followers ${followers.length}`} />
          </ListItem>
          {profileUser === auth.sub && (
            <Modal
              style={{ display: "flex", flexGrow: 1 }}
              open={open === "followers" ? true : false}
              onClose={handleClose}
            >
              <List dense className={classes.list}>
                {followers.length > 0 ? (
                  followers.map((f) => <PeopleItem key={f._id} profile={f} />)
                ) : (
                  <Typography
                    component="h4"
                    variant="h6"
                    style={{ margin: "auto" }}
                  >
                    No followers.
                  </Typography>
                )}
              </List>
            </Modal>
          )}
          <ListItem
            button={profileUser === auth.sub ? true : false}
            onClick={() => setOpen("following")}
          >
            <ListItemIcon>
              <RecentActorsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText secondary={`Following ${following.length}`} />
          </ListItem>
          {profileUser === auth.sub && (
            <Modal
              style={{ display: "flex", flexGrow: 1 }}
              open={open === "following" ? true : false}
              onClose={handleClose}
            >
              <List dense className={classes.list}>
                {following.length > 0 ? (
                  following.map((f) => <PeopleItem  key={f._id} profile={f} />)
                ) : (
                  <Typography
                    component="h4"
                    variant="h6"
                    style={{ margin: "auto" }}
                  >
                    No following.
                  </Typography>
                )}
              </List>
            </Modal>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps)(FollowPost);
