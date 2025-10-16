import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid,
  FormControlLabel, Checkbox
} from "@mui/material";

export default function ProposalFormDialog({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    id: `P-2026-${String(Math.floor(Math.random()*900+100)).padStart(3,"0")}`,
    title: "", code: "", region: "", province: "", city: "", barangay: "",
    implementingAgency: "DPWH", proponent: "", budget: "", startDate: "", longevity: "",
    flags: { similarProject: false, poorlySituated: false, contractorIssues: false }
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const toggle = (k) => (e) => setForm(f => ({ ...f, flags: { ...f.flags, [k]: e.target.checked }}));

  const save = () => { if (!form.title) return; onSave(form); onClose(); };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>New Project Proposal</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={12}><TextField label="Project Name" fullWidth value={form.title} onChange={set("title")} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Project Code" fullWidth value={form.code} onChange={set("code")} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Implementing Agency" fullWidth value={form.implementingAgency} onChange={set("implementingAgency")} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Region" fullWidth value={form.region} onChange={set("region")} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Province" fullWidth value={form.province} onChange={set("province")} /></Grid>
          <Grid item xs={12} md={6}><TextField label="City/Municipality" fullWidth value={form.city} onChange={set("city")} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Barangay" fullWidth value={form.barangay} onChange={set("barangay")} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Budget (PHP)" fullWidth value={form.budget} onChange={set("budget")} /></Grid>
          <Grid item xs={12} md={3}><TextField label="Start Date" type="date" fullWidth InputLabelProps={{shrink:true}} value={form.startDate} onChange={set("startDate")} /></Grid>
          <Grid item xs={12} md={3}><TextField label="Longevity" placeholder="e.g., 18 months" fullWidth value={form.longevity} onChange={set("longevity")} /></Grid>
          <Grid item xs={12}><TextField label="Proponent" fullWidth value={form.proponent} onChange={set("proponent")} /></Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={form.flags.similarProject} onChange={toggle("similarProject")} />} label="Similar Project" />
            <FormControlLabel control={<Checkbox checked={form.flags.poorlySituated} onChange={toggle("poorlySituated")} />} label="Poorly Situated" />
            <FormControlLabel control={<Checkbox checked={form.flags.contractorIssues} onChange={toggle("contractorIssues")} />} label="Issues with Contractor" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
