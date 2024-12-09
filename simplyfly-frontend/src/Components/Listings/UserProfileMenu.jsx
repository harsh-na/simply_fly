import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Button,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";

const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        startIcon={<Avatar alt="User Profile" src="/assets/user-avatar.jpg" />}
      >
        <Typography variant="body1">John Doe</Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserProfileMenu;
