import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-ui/core/";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import { connect } from "react-redux";
import { LogoutStart } from "../../redux/auth/auth.actions";
import styled from "styled-components";

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const AccountDropdown = ({ anchorEl, handleClose, LogoutStart ,auth }) => {
  const handleLogout = () => {
    LogoutStart();
    handleClose();
  };
  return (
    <DropdownMenu anchorEl={anchorEl} handleClose={handleClose}>
      <LinkStyle to={`/profile/${auth.sub}`}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </LinkStyle>
      {/* <MenuItem>Settings</MenuItem> */}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </DropdownMenu>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, { LogoutStart })(AccountDropdown);
