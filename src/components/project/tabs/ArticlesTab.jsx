import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import SectionCard from "../SectionCard.jsx";

export default function ArticlesTab() {
  const articles = [
    { title: "CDO Flood Mitigation: Section 1 Mobilization Starts", date: "Aug 2025" },
    { title: "DPWH Notes Progress on Riverbank Protection", date: "Oct 2025" },
  ];

  return (
    <SectionCard title="Articles & Publications">
      <List dense>
        {articles.map((a, i) => (
          <ListItem key={i} divider>
            <ListItemText
              primary={a.title}
              secondary={a.date}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItem>
        ))}
      </List>
    </SectionCard>
  );
}
