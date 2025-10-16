import React from "react";
import { Tabs, Tab, useMediaQuery } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function NavTabs() {
  const { pathname } = useLocation();
  const current = ["/overview","/proposals","/monitoring","/assessment","/reports"].includes(pathname) ? pathname : false;
  const isSmall = useMediaQuery("(max-width:900px)");
  if (isSmall) return null;

  return (
    <Tabs value={current} textColor="inherit" indicatorColor="secondary" sx={{ ml: 4 }}>
      <Tab label="Overview" value="/overview" component={RouterLink} to="/overview" />
      <Tab label="Proposals" value="/proposals" component={RouterLink} to="/proposals" />
      <Tab label="Monitoring" value="/monitoring" component={RouterLink} to="/monitoring" />
      <Tab label="Assessment" value="/assessment" component={RouterLink} to="/assessment" />
      {/* <Tab label="Reports" value="/reports" component={RouterLink} to="/reports" /> */}
    </Tabs>
  );
}
