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
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar.jsx";
import Footer from "../../components/Footer.jsx";
import raw from "../../data/flood_projects_array.json";
import contractors_list from "../../data/contractors.json";

// ───────────── helpers (keep simple & strict) ─────────────
function statusBucket(s) {
  const v = String(s || "").toLowerCase();
  if (v.includes("progress")) return "In Progress";
  if (v.includes("complete")) return "Completed";
  if (v.includes("propos") || v.includes("not yet")) return "Proposed";
  if (s === "Proposed" || s === "In Progress" || s === "Completed") return s;
  return "Proposed";
}
const peso = (v) => "₱" + (Number(v) || 0).toLocaleString("en-PH");

// STRICT region canon: only accept EXACT strings present in the <Select> options below
const ACCEPTED_REGIONS = [
  "NCR",
  "CAR",
  "Region I",
  "Region II",
  "Region III",
  "Region IV-A",
  "MIMAROPA",
  "Region V",
  "Region VI",
  "Region VII",
  "Region VIII",
  "Region IX",
  "Region X",
  "Region XI",
  "Region XII",
  "Region XIII",
  "BARMM",
];

export default function MonitoringPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState(""); // canonical; "" = all
  const [contractor, setContractor] = useState(""); // exact string; "" = all

  // Load once and derive strict fields
  useEffect(() => {
    const rows = (Array.isArray(raw) ? raw : []).map((d) => {
      return {
        id: d.id ?? d.code ?? `${Math.random().toString(36).slice(2)}`,
        code: d.id ?? d.code ?? "—",
        name: d.name || d.title || "—",
        region: d.region || "—",
        agency: (d.contractor ?? "—").toString(), // use as-is for strict matching
        budget: Number(d.budget) || 0,
        status: statusBucket(d.status),
        lat: d.lat,
        lng: d.lng,
        year: d.year,
      };
    });
    setProjects(rows);
  }, []);

  // STRICT filtering: ALL criteria must pass
  const filtered = useMemo(() => {
    const q = String(search ?? "").trim().toLowerCase();
    const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

    return projects.filter((p) => {
      // 1) Region must be exact canon match when a region is selected
      const matchesRegion = region ? p.region === region : true;

      // 2) Contractor must match EXACTLY (no trim/lower/normalize)
      const matchesContractor = contractor ? p.agency === contractor : true;

      // 3) Search: AND across tokens (case-insensitive contains)
      const hay = `${(p.name || "").toLowerCase()} ${(p.code || "").toLowerCase()} ${(p.agency || "").toLowerCase()} ${(p.region || "").toLowerCase()}`;
      const matchesSearch = tokens.length ? tokens.every((t) => hay.includes(t)) : true;

      return matchesRegion && matchesContractor && matchesSearch;
    });
  }, [search, region, contractor, projects]);

  console.log("Results:", { total: projects.length, filtered: filtered.length });

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 6, flex: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Monitoring
        </Typography>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }} elevation={3}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            flexWrap="wrap"
          >
            {/* Region (STRICT options only) */}
            <FormControl sx={{ minWidth: 220, maxWidth: 300 }}>
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

            {/* Contractor (exact string equality) */}
            <FormControl sx={{ minWidth: 220, maxWidth: 400 }}>
              <InputLabel>Contractor</InputLabel>
              <Select label="Contractor" value={contractor} onChange={(e) => setContractor(e.target.value)}>
                <MenuItem value="">All Contractors</MenuItem>
                {contractors_list.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Search (70% on md+) */}
            <TextField
              label="Search Project / Code / Contractor"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: { xs: "70%", md: "70%" } , maxWidth: 700 }}
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

        {/* Table */}
        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f2f2f2" }}>
                <TableCell sx={{ fontWeight: 700 }}>Project Name / Code</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Contractor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Budget (₱)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
           <TableBody>

            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary" sx={{ py: 4 }}>
                    No projects match your filters.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filtered
                .filter(
                  (p) =>
                    (!region || p.region === region) &&
                    (!contractor || p.agency === contractor)
                )
                .map((p) => (
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
                        onClick={() =>
                          navigate(`/monitoring/${encodeURIComponent(p.id)}`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>

          </Table>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}
