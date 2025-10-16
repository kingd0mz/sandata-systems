import React, { useState } from "react";
import { Box, Stack, Typography, Slider, FormControlLabel, Switch } from "@mui/material";
import SectionCard from "../project/SectionCard.jsx";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function EvaluationTab({ center=[8.4081,124.5922] }) {
  const [showHazard, setShowHazard] = useState(true);
  const [opacity, setOpacity] = useState(0.45);

  return (
    <>
      <SectionCard title="Evaluation Summary">
        <Typography variant="body2">
          Satellite view of the proposed site. Hazard overlay is a mock raster for now (to be replaced with official hazard layers).
        </Typography>
        <Stack direction="row" spacing={3} sx={{ mt: 2 }} alignItems="center">
          <FormControlLabel control={<Switch checked={showHazard} onChange={(e)=>setShowHazard(e.target.checked)} />} label="Show Hazard Overlay" />
          <Box sx={{ width: 240, display: showHazard ? "block" : "none" }}>
            <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>Overlay Opacity</Typography>
            <Slider size="small" min={0} max={1} step={0.05} value={opacity} onChange={(_,v)=>setOpacity(v)} />
          </Box>
        </Stack>
      </SectionCard>

      <Box sx={{ height: 480, borderRadius: 2, overflow: "hidden" }}>
        <MapContainer center={center} zoom={15} style={{ height:"100%", width:"100%" }}>
          {/* Google Satellite */}
          <TileLayer url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" subdomains={["mt0","mt1","mt2","mt3"]} attribution='Imagery © Google (demo)'/>
          {/* Mock hazard overlay (semi-transparent colored tiles) */}
          {showHazard && (
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              opacity={opacity}
              attribution="Hazard overlay (mock)"
            />
          )}
          <Marker position={center}>
            <Popup>
              <Typography variant="body2" fontWeight={600}>Proposed Site</Typography>
              <Typography variant="caption">{center[0].toFixed(5)}, {center[1].toFixed(5)}</Typography>
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </>
  );
}
