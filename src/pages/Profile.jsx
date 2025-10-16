import React from "react";
import { Container, Typography, Box } from "@mui/material";
import TopBar from "../components/TopBar.jsx";
import Footer from "../components/Footer.jsx";

export default function Profile(){
  return (
    <Box sx={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <TopBar />
      <Container maxWidth="xl" sx={{ mt: 3, mb: 6, flex:1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Profile</Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>Map, metrics and charts will appear here in the next step.</Typography>
      </Container>
      <Footer />
    </Box>
  );
}
