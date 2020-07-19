import React from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = makeStyles({
  card: {
    margin: "10px 0",
  },
});

const FollowPost = ({ following, followers , posts }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent style={{ textAlign: "center", padding: 10 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <PeopleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText secondary={`Followers ${followers.length}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <RecentActorsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText secondary={`Following ${following.length}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AssignmentIcon color="secondary" />
            </ListItemIcon>
            <ListItemText secondary={`Posted ${posts}`}/>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default FollowPost;
