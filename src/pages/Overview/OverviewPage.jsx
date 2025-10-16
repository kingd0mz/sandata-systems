import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box, Stack, Paper, Typography, Button, FormControl, InputLabel, Select, MenuItem, Chip, Divider
} from "@mui/material";
import TopBar from "../../components/TopBar.jsx";
import Footer from "../../components/Footer.jsx";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, CartesianGrid,
} from "recharts";

// ───────────────── helpers ─────────────────
function statusBucket(s) {
  const v = String(s || "").toLowerCase();
  if (v.includes("progress")) return "In Progress";
  if (v.includes("complete")) return "Completed";
  if (v.includes("propos") || v.includes("not yet")) return "Proposed";
  // fall back to exact valid values if already clean
  if (s === "Proposed" || s === "In Progress" || s === "Completed") return s;
  return "Proposed";
}

const statusColor = {
  Proposed: "#6c757d",
  "In Progress": "#26a69a",
  Completed: "#2e7d32",
};

// icon factory with hover state
const pin = (color = "#6c757d", active = false) =>
  L.divIcon({
    className: "custom-pin",
    html: active
      ? `<div style="background:${color}; width:16px; height:16px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 0 2px ${color}33, 0 2px 6px rgba(0,0,0,.2)"></div>`
      : `<div style="background:${color}; width:12px; height:12px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 0 1px rgba(0,0,0,.2)"></div>`,
    iconSize: [active ? 16 : 12, active ? 16 : 12],
  });

// mock polygons
const REGION_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Region VI" },
      geometry: { type: "Polygon", coordinates: [[[122.2,10.9],[122.9,10.9],[122.9,10.4],[122.2,10.4],[122.2,10.9]]] },
    },
    {
      type: "Feature",
      properties: { name: "Region X" },
      geometry: { type: "Polygon", coordinates: [[[124.1,8.7],[124.9,8.7],[124.9,8.1],[124.1,8.1],[124.1,8.7]]] },
    },
  ],
};

export default function OverviewPage() {
  const [year, setYear] = useState("All");
  const [region, setRegion] = useState("All");
  const [hoverId, setHoverId] = useState(null);
  const [projects, setProjects] = useState([]);

  const mapRef = useRef(null);

  // IMPORTANT: place the JSON at /public/data/flood_projects_array.json
  useEffect(() => {
    fetch("/data/flood_projects_array.json")
      .then((r) => r.json())
      .then((data) => {
        const cleaned = (Array.isArray(data) ? data : [])
          .filter(d => Number.isFinite(d?.lat) && Number.isFinite(d?.lng)); // skip missing/NaN coords
        setProjects(cleaned);
      })
      .catch(() => setProjects([]));
  }, []);

  // dynamic year list (fix: add dependency on projects)
  const years = useMemo(() => {
    const set = new Set(projects.map((p) => p.year).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (year === "All" ? true : p.year === Number(year)) &&
          (region === "All" ? true : (p.region || "").trim() === region)
      ),
    [projects, year, region]
  );

  const counts = useMemo(() => {
    const c = { Proposed: 0, "In Progress": 0, Completed: 0 };
    filtered.forEach((p) => c[statusBucket(p.status)]++);
    return c;
  }, [filtered]);

  const peso = (v) => {
    const n = Number.isFinite(v) ? v : 0;
    return "₱" + n.toLocaleString("en-PH");
  };

  const budgetByStatus = useMemo(() => {
    const agg = { Proposed: 0, "In Progress": 0, Completed: 0 };
    filtered.forEach((p) => {
      const k = statusBucket(p.status);
      const amt = Number.isFinite(p.budget) ? p.budget : 0;
      agg[k] += amt;
    });
    return [
      {
        category: "Budget",
        Proposed: agg.Proposed,
        "In Progress": agg["In Progress"],
        Completed: agg.Completed,
      },
    ];
  }, [filtered]);

  // Treat flags as mutually-exclusive categories by priority:
  // poorly > similar > healthy > other (fallback).
  const flagsPie = useMemo(() => {
    const sum = { poorly: 0, similar: 0, healthy: 0, other: 0 };
    filtered.forEach((p) => {
      const f = p?.flags || {};
      if (f.poorlySituated) sum.poorly++;
      else if (f.similarProject) sum.similar++;
      else if (f.healthy) sum.healthy++;
      else sum.other++;
    });
    return [
      { name: "Poorly Situated", value: sum.poorly, color: "#e53935" },
      { name: "Similar Project", value: sum.similar, color: "#9e9e9e" },
      { name: "Healthy", value: sum.healthy, color: "#26a69a" },
      { name: "Others", value: sum.other, color: "#90a4ae" },
    ];
  }, [filtered]);

  const topContractors = useMemo(() => {
    const map = new Map();
    filtered.forEach((p) => {
      const k = (p.contractor || "—").trim() || "—";
      const amt = Number.isFinite(p.budget) ? p.budget : 0;
      map.set(k, (map.get(k) || 0) + amt);
    });
    const arr = Array.from(map.entries()).map(([name, value]) => ({ name, value }));
    arr.sort((a, b) => b.value - a.value);
    return arr.slice(0, 8);
  }, [filtered]);

  const onRegionEach = (feature, layer) => {
    layer.on({
      click: () => {
        const name = feature?.properties?.name;
        if (!name) return;
        setRegion(name);
        const map = mapRef.current;
        if (map) {
          const bounds = layer.getBounds();
          map.fitBounds(bounds, { padding: [20, 20] });
        }
      },
    });
    layer.setStyle({ color: "#424242", weight: 1, fillOpacity: 0.05 });
    layer.bindTooltip(feature?.properties?.name || "", { sticky: true });
  };

  const resetView = () => {
    setRegion("All");
    const map = mapRef.current;
    if (map) map.setView([12.8797, 121.774], 5);
  };

  const hoveredProject = useMemo(
    () => filtered.find((p) => p.id === hoverId) || null,
    [hoverId, filtered]
  );

  // ───────────────────────────────── UI ─────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />

      <Box sx={{ flex: 1, display: "flex", gap: 2, p: 2 }}>
        {/* LEFT SIDE */}
        <Box sx={{ width: { xs: "100%", lg: "43%" }, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Controls */}
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight={700}>Overview</Typography>
                {region !== "All" && <Chip label={region} onDelete={resetView} />}
              </Stack>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Year</InputLabel>
                <Select label="Year" value={year} onChange={(e) => setYear(e.target.value)}>
                  {years.map((y) => (
                    <MenuItem key={y} value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="outlined" onClick={() => window.print()}>Export / Print</Button>
            </Stack>
          </Paper>

          {/* Hover Info Card */}
          {hoveredProject && (
            <Paper sx={{ p:2, borderRadius:3 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: .5 }}>
                {hoveredProject.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {statusBucket(hoveredProject.status)} • {hoveredProject.region}
              </Typography>
              <Divider sx={{ my: 1.2 }} />
              <Stack direction="row" spacing={3} flexWrap="wrap">
                <Stack>
                  <Typography variant="caption" color="text.secondary">Budget</Typography>
                  <Typography fontWeight={700}>{peso(hoveredProject.budget)}</Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption" color="text.secondary">Contractor</Typography>
                  <Typography fontWeight={700}>{hoveredProject.contractor || "—"}</Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption" color="text.secondary">Year</Typography>
                  <Typography fontWeight={700}>{hoveredProject.year}</Typography>
                </Stack>
              </Stack>
            </Paper>
          )}

          {/* KPI Cards */}
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            <Paper sx={{ p: 2, borderRadius: 3, flex: "1 1 30%", minWidth: 180 }}>
              <Typography variant="body2" color="text.secondary">Proposed</Typography>
              <Typography variant="h5" fontWeight={800}>{counts["Proposed"]}</Typography>
            </Paper>
            <Paper sx={{ p: 2, borderRadius: 3, flex: "1 1 30%", minWidth: 180 }}>
              <Typography variant="body2" color="text.secondary">In Progress</Typography>
              <Typography variant="h5" fontWeight={800}>{counts["In Progress"]}</Typography>
            </Paper>
            <Paper sx={{ p: 2, borderRadius: 3, flex: "1 1 30%", minWidth: 180 }}>
              <Typography variant="body2" color="text.secondary">Completed</Typography>
              <Typography variant="h5" fontWeight={800}>{counts["Completed"]}</Typography>
            </Paper>
          </Stack>

          {/* Budget by Status */}
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Budget by Status</Typography>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={budgetByStatus} layout="vertical">
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="category" hide />
                <Tooltip formatter={(v) => peso(v)} />
                <Legend verticalAlign="bottom" height={24} />
                <Bar dataKey="Proposed" stackId="a" fill={statusColor["Proposed"]} />
                <Bar dataKey="In Progress" stackId="a" fill={statusColor["In Progress"]} />
                <Bar dataKey="Completed" stackId="a" fill={statusColor["Completed"]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/* Pie: Flags */}
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Proposal Flags</Typography>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie data={flagsPie} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                  {flagsPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          {/* Bar: Top Contractors */}
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Top Contractors by Budget</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={topContractors.map((d) => ({
                  ...d,
                  originalName: d.name,
                  name: d.name.length > 20 ? d.name.slice(0, 20) + "…" : d.name,
                }))}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis type="number" tickFormatter={(v) => (Number(v)||0).toLocaleString("en-PH")} />
                <YAxis type="category" dataKey="name" width={140} />
                <Tooltip formatter={(v, n, p) => [peso(v), p.payload.originalName || p.name]} />
                <Bar dataKey="value" fill="#607d8b" radius={[4,4,4,4]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* RIGHT MAP */}
        <Box sx={{ flex: 1, minHeight: 600 }}>
          <Paper sx={{ height: "100%", borderRadius: 3, overflow: "hidden", position: "relative" }}>
            <MapContainer
              center={[12.8797, 121.7740]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(map) => (mapRef.current = map)}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <GeoJSON data={REGION_GEOJSON} onEachFeature={onRegionEach} />

              {/* Markers with hover handlers */}
              {filtered.map((p) => {
                const bucket = statusBucket(p.status);
                const active = hoverId === p.id;
                return (
                  <Marker
                    key={p.id}
                    position={[p.lat, p.lng]}
                    icon={pin(statusColor[bucket], active)}
                    eventHandlers={{
                      mouseover: () => setHoverId(p.id),
                      mouseout:  () => setHoverId((id)=> (id===p.id ? null : id)),
                      click:     () => setHoverId(p.id),
                    }}
                  >
                    <Popup>
                      <Typography fontWeight={700} variant="body2">{p.name}</Typography>
                      <Typography variant="caption">{bucket} • {p.region}</Typography><br/>
                      <Typography variant="caption">Budget: {peso(p.budget)}</Typography>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </Paper>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
