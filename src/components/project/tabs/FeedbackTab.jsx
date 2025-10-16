import React from "react";
import { List, ListItem, ListItemText, Chip, Stack } from "@mui/material";
import SectionCard from "../SectionCard.jsx";

export default function FeedbackTab() {
  const feedback = [
    { reporter: "Citizen #A102", date: "2025-02-15", text: "Noise from nighttime works.", status: "In Progress" },
    { reporter: "Brgy. Lumbia", date: "2025-03-02", text: "Requesting clearer detour signage.", status: "Resolved" },
  ];

  return (
    <SectionCard title="Feedback (ARNISS)">
      <List dense>
        {feedback.map((f, i) => (
          <ListItem key={i} divider>
            <ListItemText
              primary={`${f.reporter} — ${f.date}`}
              secondary={f.text}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
            <Stack direction="row" spacing={1}>
              <Chip label={f.status} color={f.status === "Resolved" ? "success" : "warning"} size="small" />
            </Stack>
          </ListItem>
        ))}
      </List>
    </SectionCard>
  );
}
