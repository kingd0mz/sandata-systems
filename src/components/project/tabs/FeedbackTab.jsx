import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Typography,
  Divider,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SectionCard from "../SectionCard.jsx";
import arniss1 from "../../../data/arniss1.png";
import arniss2 from "../../../data/arniss2.png";

export default function FeedbackTab() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const feedback = [
    {
      reporter: "Citizen #A102",
      date: "2025-02-15",
      text: "Noise from nighttime works.",
      fullText:
        "Ongoing night works near the residential block are causing loud hammering and vehicle noise past 11PM. Requesting mitigation measures and adjusted schedule.",
      status: "In Progress",
      category: "City Hall Services",
      address: "Old Railroad, Simeon Ledesma, Iloilo City",
      media: arniss1,
    },
    {
      reporter: "Brgy. Lumbia",
      date: "2025-03-02",
      text: "Requesting clearer detour signage.",
      fullText:
        "Motorists are confused at the eastbound lane closure. Please install larger detour signs and add reflectors at night; two near-misses reported.",
      status: "Resolved",
      category: "Traffic Management",
      address: "Zone 3, Brgy. Lumbia",
      media: arniss2,
    },
  ];

  const openDialog = (item) => {
    setSelected(item);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <SectionCard title="Feedback (ARNISS)">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          ARNISS (Automated Reporting and National Infrastructure Surveillance System)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          ARNISS is the mobile and surveillance arm of <strong>SANDATA</strong>, letting field
          teams capture geotagged photos and reports that sync to the platform for validation,
          progress tracking, and transparent audits.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Recent Feedback
      </Typography>

      <List dense>
        {feedback.map((f, i) => (
          <ListItem
            key={i}
            divider
            alignItems="flex-start"
            onClick={() => openDialog(f)}
            sx={{
              cursor: "pointer",
              borderRadius: 2,
              "&:hover": { bgcolor: "action.hover" },
              transition: "background-color 120ms ease",
            }}
          >
            <ListItemText
              primary={<Typography fontWeight={600}>{f.reporter} — {f.date}</Typography>}
              secondary={f.text}
              primaryTypographyProps={{ noWrap: true }}
              secondaryTypographyProps={{ noWrap: true }}
            />
            <Stack direction="row" spacing={1}>
              <Chip
                label={f.status}
                color={f.status === "Resolved" ? "success" : "warning"}
                size="small"
              />
            </Stack>
          </ListItem>
        ))}
      </List>

      {/* Click-to-open details dialog (click outside to close) */}
      <Dialog
        open={open}
        onClose={closeDialog} // closes on backdrop click and Esc
        maxWidth="sm"
        fullWidth
        aria-labelledby="feedback-details"
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
      >
        {selected && (
          <>
            {selected.media && (
              <CardMedia
                component="img"
                image={selected.media}
                alt="Report media"
                sx={{ height: 220, objectFit: "cover" }}
              />
            )}
            <DialogContent sx={{ position: "relative", pt: 2 }}>
              <IconButton
                aria-label="close"
                onClick={closeDialog}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="overline" color="text.secondary">
                {selected.category || "Feedback"}
              </Typography>
              <Typography variant="h6" fontWeight={700} gutterBottom id="feedback-details">
                {selected.reporter} — {selected.date}
              </Typography>

              {selected.address && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    Address:
                  </Typography>
                  <Typography variant="body2">{selected.address}</Typography>
                </Box>
              )}

              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                Description:
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {selected.fullText || selected.text}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Chip
                  label={selected.status}
                  color={selected.status === "Resolved" ? "success" : "warning"}
                  size="small"
                />
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </SectionCard>
  );
}
