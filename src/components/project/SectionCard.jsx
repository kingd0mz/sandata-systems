import React from "react";
import { Paper, Box, Typography, useTheme } from "@mui/material";

export default function SectionCard({ title, children }) {
  const theme = useTheme();
  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden", mb: 2 }}>
      <Box
        sx={{
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.getContrastText(theme.palette.secondary.main),
          px: 2, py: 1.25,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
      </Box>
      <Box sx={{ p: 2.5 }}>{children}</Box>
    </Paper>
  );
}
