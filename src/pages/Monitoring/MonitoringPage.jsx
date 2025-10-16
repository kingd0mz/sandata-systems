import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TopBar from "../../components/TopBar.jsx";
import Footer from "../../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

// Keep status bucketing consistent with Overview
function statusBucket(s) {
  const v = String(s || "").toLowerCase();
  if (v.includes("progress")) return "In Progress";
  if (v.includes("complete")) return "Completed";
  if (v.includes("propos") || v.includes("not yet")) return "Proposed";
  if (s === "Proposed" || s === "In Progress" || s === "Completed") return s;
  return "Proposed";
}
const peso = (v) => "₱" + (Number(v) || 0).toLocaleString("en-PH");

export default function MonitoringPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  // Load the same JSON as Overview
  useEffect(() => {
    fetch("/data/flood_projects_array.json")
      .then((r) => r.json())
      .then((data) => {
        const rows = (Array.isArray(data) ? data : []).map((d) => ({
          id: d.id,
          code: d.id,                            // use id as code
          name: d.name,
          region: (d.region || "—").trim(),
          agency: (d.contractor || "—").trim(),  // show contractor as Implementing Agency
          budget: Number(d.budget) || 0,
          startDate: "—",                        // not in dataset
          status: statusBucket(d.status),
          lat: d.lat,
          lng: d.lng,
          year: d.year,
        }));
        setProjects(rows);
      })
      .catch(() => setProjects([]));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesRegion = region ? p.region === region : true;
      const hay = `${p.name} ${p.code}`.toLowerCase();
      const matchesSearch = q ? hay.includes(q) : true;
      return matchesRegion && matchesSearch;
    });
  }, [search, region, projects]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 6, flex: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Monitoring
        </Typography>

        {/* Filter Controls */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }} elevation={3}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <FormControl sx={{ minWidth: 220 }}>
              <InputLabel>Region</InputLabel>
              <Select label="Region" value={region} onChange={(e) => setRegion(e.target.value)}>
                <MenuItem value="">All Regions</MenuItem>
                <MenuItem value="NCR">NCR - National Capital Region</MenuItem>
                <MenuItem value="CAR">CAR - Cordillera Administrative Region</MenuItem>
                <MenuItem value="Region I">Region I - Ilocos Region</MenuItem>
                <MenuItem value="Region II">Region II - Cagayan Valley</MenuItem>
                <MenuItem value="Region III">Region III - Central Luzon</MenuItem>
                <MenuItem value="Region IV-A">Region IV-A - CALABARZON</MenuItem>
                <MenuItem value="MIMAROPA">MIMAROPA - Southwestern Tagalog Region</MenuItem>
                <MenuItem value="Region V">Region V - Bicol Region</MenuItem>
                <MenuItem value="Region VI">Region VI - Western Visayas</MenuItem>
                <MenuItem value="Region VII">Region VII - Central Visayas</MenuItem>
                <MenuItem value="Region VIII">Region VIII - Eastern Visayas</MenuItem>
                <MenuItem value="Region IX">Region IX - Zamboanga Peninsula</MenuItem>
                <MenuItem value="Region X">Region X - Northern Mindanao</MenuItem>
                <MenuItem value="Region XI">Region XI - Davao Region</MenuItem>
                <MenuItem value="Region XII">Region XII - SOCCSKSARGEN</MenuItem>
                <MenuItem value="Region XIII">Region XIII - Caraga</MenuItem>
                <MenuItem value="BARMM">BARMM - Bangsamoro Autonomous Region in Muslim Mindanao</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Search Project Name / Code"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Paper>

        {/* Projects Table */}
        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f2f2f2" }}>
                <TableCell sx={{ fontWeight: 700 }}>Project Name / Code</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Implementing Agency</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Budget (₱)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{p.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {p.code}
                    </Typography>
                  </TableCell>
                  <TableCell>{p.region}</TableCell>
                  <TableCell>{p.agency}</TableCell>
                  <TableCell>{peso(p.budget)}</TableCell>
                  <TableCell>{p.year || "—"}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => navigate(`/monitoring/${encodeURIComponent(p.id)}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary" sx={{ py: 4 }}>
                      No projects match your filters.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}
