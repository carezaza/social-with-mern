import React, { Fragment, useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";

// import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton } from "@material-ui/core/"; //Badge
import AccountDropdown from "./account-dropdown";

// import NotificationsDropdown from "./notifications-dropdown";
// import MailsDropdown from "./mails-dropdown";
// import MailIcon from "@material-ui/icons/Mail";
// import SearchInput from "../search-input/search-input";
import PeopleIcon from "@material-ui/icons/People";
import { connect } from "react-redux";
import PeopleDropDown from "./people.dropdown";

const UserMenus = ({ auth }) => {
  const [accAnchorEl, setAccAnchorEl] = useState(null);
  // const [notifyAnchorEl, setNotifyAnchorEl] = useState(null);
  const [peopleAnchorEl, setPeopleAnchorEl] = useState(null);
  // const [mailAnchorEl, setMailAnchorEl] = useState(null);
  if (!auth) return null;
  return (
    <Fragment>
      {/* <SearchInput /> */}
      {/* <IconButton
        aria-label="show Mails"
        color="inherit"
        onClick={(event) => setMailAnchorEl(event.currentTarget)}
      >
        <MailIcon style={{ color: "white" }} />
      </IconButton> */}
      <IconButton
        aria-label="show Mails"
        color="inherit"
        onClick={(event) => setPeopleAnchorEl(event.currentTarget)}
      >
        <PeopleIcon style={{ color: "white" }} />
      </IconButton>
      {/* <IconButton
        aria-label="show Notifications"
        color="inherit"
        onClick={(event) => setNotifyAnchorEl(event.currentTarget)}
      >
        <Badge badgeContent={0} color="secondary">
          <NotificationsIcon style={{ color: "white" }} />
        </Badge>
      </IconButton> */}
      <IconButton
        aria-label="account of current user"
        color="inherit"
        onClick={(event) => setAccAnchorEl(event.currentTarget)}
      >
        <AccountCircle style={{ color: "white" }} />
      </IconButton>
      {/* <NotificationsDropdown
        anchorEl={notifyAnchorEl}
        handleClose={(event) => setNotifyAnchorEl(null)}
      /> */}
      <PeopleDropDown
        anchorEl={peopleAnchorEl}
        handleClose={(event) => setPeopleAnchorEl(null)}
      />
      {/* <MailsDropdown
        anchorEl={mailAnchorEl}
        handleClose={(event) => setMailAnchorEl(null)}
      /> */}
      <AccountDropdown
        anchorEl={accAnchorEl}
        handleClose={(event) => setAccAnchorEl(null)}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps)(UserMenus);
