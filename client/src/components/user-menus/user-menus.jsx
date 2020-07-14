import React, { Fragment, useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton, Badge } from "@material-ui/core/";
import AccountDropdown from "../account-dropdown/account-dropdown";
import MailsDropdown from "../mails-dropdown/mails-dropdown";
import NotificationsDropdown from "../notifications-dropdown/notifications-dropdown";
import SearchInput from "../search-input/search-input";
import { connect } from "react-redux";

const UserMenus = ({ auth }) => {

  const [accAnchorEl, setAccAnchorEl] = useState(null);
  const [notifyAnchorEl, setNotifyAnchorEl] = useState(null);
  const [mailAnchorEl, setMailAnchorEl] = useState(null);
  if (!auth) return null;
  return (
    <Fragment>
      <SearchInput />
      <IconButton
        aria-label="show Mails"
        color="inherit"
        onClick={(event) => setMailAnchorEl(event.currentTarget)}
      >
        <Badge badgeContent={0} color="secondary">
          <MailIcon style={{ color: "white" }} />
        </Badge>
      </IconButton>
      <IconButton
        aria-label="show Notifications"
        color="inherit"
        onClick={(event) => setNotifyAnchorEl(event.currentTarget)}
      >
        <Badge badgeContent={0} color="secondary">
          <NotificationsIcon style={{ color: "white" }} />
        </Badge>
      </IconButton>
      <IconButton
        aria-label="account of current user"
        color="inherit"
        onClick={(event) => setAccAnchorEl(event.currentTarget)}
      >
        <AccountCircle style={{ color: "white" }} />
      </IconButton>
      <NotificationsDropdown
        anchorEl={notifyAnchorEl}
        handleClose={(event) => setNotifyAnchorEl(null)}
      />
      <MailsDropdown
        anchorEl={mailAnchorEl}
        handleClose={(event) => setMailAnchorEl(null)}
      />
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
