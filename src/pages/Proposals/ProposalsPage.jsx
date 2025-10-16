import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Container, Paper, Typography, Stack, TextField, InputAdornment,
  FormControl, InputLabel, Select, MenuItem, Button, Table, TableHead,
  TableRow, TableCell, TableBody, Checkbox, FormControlLabel, TableSortLabel
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TopBar from "../../components/TopBar.jsx";
import Footer from "../../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import StatusChip from "../../components/proposals/StatusChip.jsx";
import FlagChips from "../../components/proposals/FlagChips.jsx";
import ProposalFormDialog from "../../components/proposals/ProposalFormDialog.jsx";

function cmpDesc(a, b, k) { return b[k] < a[k] ? -1 : b[k] > a[k] ? 1 : 0; }
function getComparator(order, k) { return order === "desc" ? (a,b)=>cmpDesc(a,b,k) : (a,b)=>-cmpDesc(a,b,k); }
function stableSort(arr, cmp){ const s = arr.map((e,i)=>[e,i]); s.sort((a,b)=>{const r=cmp(a[0],b[0]); return r!==0?r:a[1]-b[1];}); return s.map(x=>x[0]); }

export default function ProposalsPage(){
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState("");
  const [fSimilar, setFSimilar] = useState(false);
  const [fPoor, setFPoor] = useState(false);
  const [fContractor, setFContractor] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [openNew, setOpenNew] = useState(false);

  useEffect(() => {
    fetch("/data/seed_proposals_200.json")
      .then(r => r.json())
      .then((data) => setRows(
        data.map(d => ({
          id: d.id,
          title: d.title,
          region: d.region,
          province: d.province,
          city: d.city,
          barangay: d.barangay ?? "—",
          status: d.status ?? "Proposed",
          budget: d.budget,
          implementingAgency: d.implementingAgency ?? "DPWH",
          proponent: d.proponent ?? d.implementingAgency ?? "—",
          submitted: d.submitted ?? "—",
          flags: d.flags ?? { similarProject:false, poorlySituated:false, contractorIssues:false },
        }))
      ));
  }, []);

  const handleSort = (prop) => () => {
    const isAsc = orderBy === prop && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(prop);
  };

  const filtered = useMemo(() => rows.filter(r =>
    (region ? r.region === region : true) &&
    (status ? r.status === status : true) &&
    (fSimilar ? r.flags.similarProject : true) &&
    (fPoor ? r.flags.poorlySituated : true) &&
    (fContractor ? r.flags.contractorIssues : true) &&
    (q ? (r.title + r.id).toLowerCase().includes(q.toLowerCase()) : true)
  ), [rows, region, status, fSimilar, fPoor, fContractor, q]);

  const sorted = useMemo(() => stableSort(filtered, getComparator(order, orderBy)), [filtered, order, orderBy]);

  const addProposal = (p) => {
    const newRow = {
      id: p.id,
      title: p.title,
      region: p.region, province: p.province, city: p.city, barangay: p.barangay,
      status: "Draft", // new entries start as Draft
      budget: p.budget, implementingAgency: p.implementingAgency,
      proponent: p.proponent || "—",
      submitted: "—",
      flags: p.flags,
    };
    setRows(prev => [newRow, ...prev]);
  };

  return (
    <Box sx={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <TopBar />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 6, flex:1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Proposals</Typography>
          <Button startIcon={<AddIcon/>} variant="contained" onClick={()=>setOpenNew(true)}>New Proposal</Button>
        </Stack>

        {/* Filters */}
        <Paper sx={{ p:2, borderRadius:3, mb:2 }} elevation={3}>
          <Stack direction={{ xs:"column", md:"row" }} spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <FormControl sx={{ minWidth:180 }}>
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
            <FormControl sx={{ minWidth:180 }}>
              <InputLabel>Status</InputLabel>
              <Select label="Status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Submitted">Submitted</MenuItem>
                <MenuItem value="Under Review">Under Review</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Search Proposal Title / ID"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              InputProps={{ startAdornment:<InputAdornment position="start"><SearchIcon/></InputAdornment> }}
            />
          </Stack>
          <Stack direction={{ xs:"column", md:"row" }} spacing={2}>
            <FormControlLabel control={<Checkbox checked={fSimilar} onChange={(e)=>setFSimilar(e.target.checked)} />} label="Similar Project" />
            <FormControlLabel control={<Checkbox checked={fPoor} onChange={(e)=>setFPoor(e.target.checked)} />} label="Poorly Situated" />
            <FormControlLabel control={<Checkbox checked={fContractor} onChange={(e)=>setFContractor(e.target.checked)} />} label="Issues with Contractor" />
          </Stack>
        </Paper>

        {/* Table */}
        <Paper sx={{ borderRadius:3, overflow:"hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor:"#f2f2f2" }}>
                <TableCell sortDirection={orderBy==="title"?order:false}>
                  <TableSortLabel active={orderBy==="title"} direction={orderBy==="title"?order:"asc"} onClick={handleSort("title")}>
                    Proposal Title / ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy==="city"?order:false}>
                  <TableSortLabel active={orderBy==="city"} direction={orderBy==="city"?order:"asc"} onClick={handleSort("city")}>
                    Location
                  </TableSortLabel>
                </TableCell>
                <TableCell>Proponent</TableCell>
                <TableCell sortDirection={orderBy==="budget"?order:false}>
                  <TableSortLabel active={orderBy==="budget"} direction={orderBy==="budget"?order:"asc"} onClick={handleSort("budget")}>
                    Budget
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy==="submitted"?order:false}>
                  <TableSortLabel active={orderBy==="submitted"} direction={orderBy==="submitted"?order:"asc"} onClick={handleSort("submitted")}>
                    Submitted
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Flags</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map(p=>(
                <TableRow key={p.id} hover onClick={()=>navigate(`/proposals/${p.id}`)} sx={{ cursor:"pointer" }}>
                  <TableCell>
                    <Typography fontWeight={600}>{p.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{p.id}</Typography>
                  </TableCell>
                  <TableCell>
                    {p.city}, {p.province}
                    <Typography variant="caption" color="text.secondary">{p.barangay}</Typography>
                  </TableCell>
                  <TableCell>{p.proponent}</TableCell>
                  <TableCell>{p.budget}</TableCell>
                  <TableCell>{p.submitted}</TableCell>
                  <TableCell><StatusChip status={p.status}/></TableCell>
                  <TableCell><FlagChips flags={p.flags} /></TableCell>
                  <TableCell onClick={(e)=>e.stopPropagation()}>
                    <Button variant="outlined" size="small" startIcon={<VisibilityIcon/>} onClick={()=>navigate(`/proposals/${p.id}`)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      <Footer />

      {/* Add Proposal Modal */}
      <ProposalFormDialog open={openNew} onClose={()=>setOpenNew(false)} onSave={addProposal} />
    </Box>
  );
}
