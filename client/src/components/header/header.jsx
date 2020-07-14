import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core/";
import HomeIcon from "@material-ui/icons/Home";
import UserMenus from '../user-menus/user-menus'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "transparent",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Link to="/" style={{ color: "#fff" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            BlaBlaBla
          </Typography>
          <UserMenus />
        </Toolbar>
      </AppBar>  
  );
}

export default Header;
