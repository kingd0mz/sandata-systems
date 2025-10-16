import React from "react";
import { Box, Typography, Paper } from "@mui/material";

/**
 * Generic wrapper for tab sections (content area)
 */
export default function ProjectSection({ title, children }) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Paper>
  );
}
