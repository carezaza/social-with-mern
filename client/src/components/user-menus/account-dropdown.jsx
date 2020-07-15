import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-ui/core/";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import { connect } from "react-redux";
import { LogoutStart } from "../../redux/auth/auth.actions";
import styled from "styled-components";

const LinkStyle = styled(Link)`
  text-decoration: none;
  color:inherit;
`;

const AccountDropdown = ({ anchorEl, handleClose, LogoutStart }) => {
  const handleLogout = () => {
    LogoutStart();
    handleClose();
  };
  return (
    <DropdownMenu anchorEl={anchorEl} handleClose={handleClose}>
      <LinkStyle to="/profile">
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </LinkStyle>
      <MenuItem>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </DropdownMenu>
  );
};

export default connect(null, { LogoutStart })(AccountDropdown);
