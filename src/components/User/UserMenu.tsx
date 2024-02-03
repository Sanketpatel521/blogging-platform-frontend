import React from "react";
import { Menu, MenuItem } from "@mui/material";

interface UserMenuProps {
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  handleProfile: () => void;
  handleLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  handleClose,
  handleProfile,
  handleLogout,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    <MenuItem onClick={handleProfile}>Update Profile</MenuItem>
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
  </Menu>
);

export default UserMenu;
