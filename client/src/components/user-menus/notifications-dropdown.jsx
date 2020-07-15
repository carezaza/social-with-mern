import React from "react";
import { MenuItem } from "@material-ui/core/";
import DropdownMenu from "../dropdown-menu/dropdown-menu";

const NotificationsDD = ({ anchorEl, handleClose }) => {
  return (
    <DropdownMenu anchorEl={anchorEl} handleClose={handleClose}>
      <MenuItem>Notifications</MenuItem>
    </DropdownMenu>
  );
};

export default NotificationsDD;
