import React from "react";
import { Box, List, ListItemButton, ListItemText, Divider } from "@mui/material";
export default function ProposalSidebar({ active, onSelect }) {
  const items = ["Project Details", "Evaluation", "Attachments"];
  return (
    <Box sx={{ width:260, flexShrink:0, borderRight:"1px solid #e0e0e0", bgcolor:"#fafafa", height:"100vh", overflowY:"auto", position:"sticky", top:0 }}>
      <List dense>
        {items.map(t=>(
          <ListItemButton key={t} selected={active===t} onClick={()=>onSelect(t)}>
            <ListItemText primary={t} primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        ))}
      </List>
      <Divider/>
    </Box>
  );
}
