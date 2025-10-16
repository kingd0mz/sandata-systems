import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SectionCard from "../SectionCard.jsx";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function UpdatesTab({ center = [8.4081, 124.5922], updates }) {
  const theme = useTheme();

  const items =
    updates ??
    [
      { date: "2025-01-05", progress: "Mobilization complete; survey stakes set." },
      { date: "2025-02-12", progress: "Excavation works underway at Cabula Section 1." },
      { date: "2025-03-28", progress: "Riprap foundation 20% complete." },
    ];

  const months = [
    "Jan 2025","Feb 2025","Mar 2025","Apr 2025","May 2025","Jun 2025",
    "Jul 2025","Aug 2025","Sep 2025","Oct 2025","Nov 2025","Dec 2025",
  ];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + months.length) % months.length);
  const next = () => setIdx((i) => (i + 1) % months.length);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        height: "calc(100vh - 200px)",
      }}
    >
      {/* LEFT: updates list */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <SectionCard title="Project Updates">
          {items.map((u, i) => (
            <Paper
              key={i}
              sx={{
                p: 2,
                mb: 1.5,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
              variant="outlined"
            >
              <Typography fontWeight={600}>{u.date}</Typography>
              <Typography variant="body2">{u.progress}</Typography>
            </Paper>
          ))}
        </SectionCard>
      </Box>

      {/* RIGHT: map */}
      <Box
        sx={{
          flex: 1,
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
          height: { xs: 400, md: "100%" },
        }}
      >
        {/* Month overlay + controls */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            position: "absolute",
            zIndex: 1000,
            top: 10,
            left: 10,
            bgcolor: "rgba(255,255,255,0.9)",
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <IconButton size="small" onClick={prev}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {months[idx]}
          </Typography>
          <IconButton size="small" onClick={next}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Map */}
        <MapContainer
          key={idx}
          center={center}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false} // disable default position
        >
          {/* Re-add zoom controls manually in a safer corner */}
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            attribution='Imagery © Google (demo basemap)'
          />
          <Marker position={center}>
            <Popup>
              <Typography variant="body2" fontWeight={600}>
                Project Site
              </Typography>
              <Typography variant="caption">
                {center[0].toFixed(5)}, {center[1].toFixed(5)}
              </Typography>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Custom zoom buttons bottom-right */}
        <Stack
          direction="column"
          spacing={0.5}
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            bgcolor: "rgba(255,255,255,0.9)",
            borderRadius: 1,
            boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
            zIndex: 1001,
          }}
        >
          <IconButton size="small" onClick={() => window.dispatchEvent(new CustomEvent("leafletZoomIn"))}>
            +
          </IconButton>
          <IconButton size="small" onClick={() => window.dispatchEvent(new CustomEvent("leafletZoomOut"))}>
            −
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
