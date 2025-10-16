import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Menu, MenuItem, Divider, Tooltip } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../app/auth/AuthContext.jsx";
import NavTabs from "./NavTabs.jsx";
import logo from "../data/sandata-logo.png";

export default function TopBar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const go = (to) => { setAnchorEl(null); navigate(to); };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ gap: 2 }}>
        {/* Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={logo}
            alt="SANDATA Systems Logo"
            width="36"
            height="36"
            style={{ borderRadius: 4 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.3 }}>
            SANDATA Systems
            </Typography>
        </Box>

        <NavTabs />
        <Box sx={{ flex: 1 }} />

        {/* Profile Avatar */}
        <Tooltip title={user ? user.username : "Guest"}>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit" size="large">
            <Avatar sx={{ bgcolor: "#1b5e20" }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} keepMounted>
          <MenuItem disabled>
            <AdminPanelSettingsIcon fontSize="small" style={{ marginRight: 8 }} /> Admin
          </MenuItem>
          <MenuItem onClick={() => go("/profile")}>
            <PersonIcon fontSize="small" style={{ marginRight: 8 }} /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => { setAnchorEl(null); logout(); navigate("/login"); }}>
            <LogoutIcon fontSize="small" style={{ marginRight: 8 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
