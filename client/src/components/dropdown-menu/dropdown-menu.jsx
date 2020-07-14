import React from "react";
import { Menu } from "@material-ui/core/";

const DropdownMenu = ({ anchorEl, handleClose, children }) => {
  return (
    <Menu
      style={{ position: "fixed", top: "38px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={!!anchorEl}
      onClose={handleClose}
    >
      {children}
    </Menu>
  );
};

export default DropdownMenu;
