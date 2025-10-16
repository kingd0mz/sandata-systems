import React from "react";
import { List, ListItem, ListItemText, Chip, Stack } from "@mui/material";
import SectionCard from "../project/SectionCard.jsx";

export default function AttachmentsTab() {
  const files = [
    { name: "Bid Documents.pdf", type: "Bid Docs" },
    { name: "Technical Specifications.pdf", type: "Tech Specs" },
    { name: "Feasibility Study.pdf", type: "Feasibility" },
  ];

  return (
    <SectionCard title="Attachments">
      <List dense>
        {files.map((f,i)=>(
          <ListItem key={i} divider>
            <ListItemText primary={f.name} secondary={f.type} primaryTypographyProps={{ fontWeight: 600 }}/>
            <Stack direction="row" spacing={1}><Chip size="small" label="Download" variant="outlined" /></Stack>
          </ListItem>
        ))}
      </List>
    </SectionCard>
  );
}
