import React, { useState } from "react";
import { Box, CircularProgress, Typography, Fade, useMediaQuery } from "@mui/material";
import TopBar from "../components/TopBar.jsx";
import Footer from "../components/Footer.jsx";

export default function Assessment() {
  const [loading, setLoading] = useState(true);
  const hideFooter = useMediaQuery("(max-width:900px)"); // hide footer on tablets and below

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />

      {/* Full-height content */}
      <Box sx={{ flex: 1, position: "relative" }}>
        {/* Loading overlay */}
        <Fade in={loading} unmountOnExit>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(255,255,255,0.85)",
            }}
          >
            <CircularProgress color="secondary" />
            <Typography variant="body2" sx={{ mt: 2, fontWeight: 500, color: "text.secondary" }}>
              Loading dashboard…
            </Typography>
          </Box>
        </Fade>

        {/* Embedded ArcGIS Dashboard */}
        <iframe
          src="https://geospatial.denr.gov.ph/arcgis/apps/dashboards/eb93969d3e9a4dbb8f87f41c8d100bcc"
          title="DENR ArcGIS Dashboard"
          width="100%"
          height="100%"
          style={{
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          onLoad={() => setLoading(false)}
          allowFullScreen
        />
      </Box>

      {/* Auto-hide footer on small screens */}
      {!hideFooter && <Footer />}
    </Box>
  );
}
