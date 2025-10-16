import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 4, bgcolor: (t)=> t.palette.mode==='dark' ? "#0b0f14" : "#f6f7f9" }}>
      <Container maxWidth="lg" sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:2, flexWrap:"wrap" }}>
        <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
          <img src="/logos/bagong-pilipinas.png" width="40" height="40" alt="Bagong Pilipinas" style={{ borderRadius: 999 }} />
          <Typography variant="body2">Bagong Pilipinas</Typography>
        </Box>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          A Philippine Government Service | Privacy | Terms | FOI | Contact
        </Typography>
      </Container>
    </Box>
  );
}
