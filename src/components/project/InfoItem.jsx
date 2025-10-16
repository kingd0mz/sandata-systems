import React from "react";
import { Box, Typography } from "@mui/material";

export default function InfoItem({ label, value }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography sx={{ fontWeight: 600, whiteSpace: "pre-line" }}>
        {value ?? "Not available"}
      </Typography>
    </Box>
  );
}
