import React from "react";
import { MenuItem } from "@material-ui/core/";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import { connect } from "react-redux";
import { LogoutStart } from "../../redux/auth/auth.actions";

const AccountDropdown = ({ anchorEl, handleClose, LogoutStart }) => {
  const handleLogout = () => {
    LogoutStart();
    handleClose();
  }
  return (
    <DropdownMenu anchorEl={anchorEl} handleClose={handleClose}>
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </DropdownMenu>
  );
};

export default connect(null, { LogoutStart })(AccountDropdown);
