import React from "react";
import { MenuItem } from "@material-ui/core/";
import DropdownMenu from "../dropdown-menu/dropdown-menu";

const MailsDropdown = ({ anchorEl, handleClose }) => {
  return (
    <DropdownMenu anchorEl={anchorEl} handleClose={handleClose}>
      <MenuItem>Mail</MenuItem>
    </DropdownMenu>
  );
};

export default MailsDropdown;
