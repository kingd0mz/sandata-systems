import React from "react";
import { Box, List, ListItemButton, ListItemText, Divider } from "@mui/material";

export default function ProjectSidebar({ active, onSelect }) {
  const items = [
    "Project Details",
    "Articles & Publications",
    "Project Updates",
    "Feedback (ARNISS)",
    "Transactions",
  ];

  return (
    <Box
      sx={{
        width: 260,
        flexShrink: 0,
        borderRight: "1px solid #e0e0e0",
        bgcolor: "#fafafa",
        height: "100vh",
        overflowY: "auto",
        position: "sticky",
        top: 0,
      }}
    >
      <List dense>
        {items.map((text) => (
          <ListItemButton
            key={text}
            selected={active === text}
            onClick={() => onSelect(text)}
          >
            <ListItemText primary={text} primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
    </Box>
  );
}
