import React, { useEffect } from "react";
import { MenuItem, Typography, Avatar } from "@material-ui/core/";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import { connect } from "react-redux";
import axios from "axios";

const NotificationsDD = ({ anchorEl, handleClose, auth }) => {
  const [notics, setNotics] = React.useState([]);
  useEffect(() => {
    axios
      .get("/api/post/notifications")
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <DropdownMenu anchorEl={anchorEl} handleClose={handleClose}>
      <MenuItem style={{ maxWidth: 300 }}>
        <Avatar src="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <Typography color="textSecondary">Name</Typography>
          <Typography color="textPrimary">Content</Typography>
        </div>
      </MenuItem>
    </DropdownMenu>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps)(NotificationsDD);
