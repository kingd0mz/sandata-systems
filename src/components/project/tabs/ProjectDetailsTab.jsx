import React from "react";
import { Grid } from "@mui/material";
import SectionCard from "../SectionCard.jsx";
import InfoItem from "../InfoItem.jsx";

export default function ProjectDetailsTab({ project }) {
  return (
    <>
      <SectionCard title="Project Overview">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}><InfoItem label="Title" value={project.title} /></Grid>
          <Grid item xs={12} md={4}><InfoItem label="Project Code" value={project.code} /></Grid>
          <Grid item xs={12} md={4}><InfoItem label="Project Location" value={project.location} /></Grid>

          <Grid item xs={12} md={4}>
            <InfoItem
              label="Project Latitude and Longitude"
              value={project.lat && project.lng ? `${project.lat}\n${project.lng}` : "Not available"}
            />
          </Grid>
          <Grid item xs={12} md={4}><InfoItem label="Contractor" value={project.contractor || "No Data Available"} /></Grid>
          <Grid item xs={12} md={4}><InfoItem label="Implementing Agency" value={project.implementingAgency} /></Grid>

          <Grid item xs={12} md={4}><InfoItem label="Project Status" value={project.status} /></Grid>
          <Grid item xs={12} md={4}><InfoItem label="Program" value={project.program} /></Grid>
          <Grid item xs={12} md={4}><InfoItem label="Created on DIME" value={project.createdOn} /></Grid>
        </Grid>
      </SectionCard>

      <SectionCard title="Project Budget">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}><InfoItem label="Project Cost" value={project.budget} /></Grid>
          <Grid item xs={12} md={4}><InfoItem label="Fund Source" value={project.fundSource || "Not available"} /></Grid>
          <Grid item xs={12} md={4}><InfoItem label="Budget Utilization/Disbursement" value={project.disbursement || "Not available"} /></Grid>
        </Grid>
      </SectionCard>

      <SectionCard title="Project Resources">
        <InfoItem label="" value={project.resources?.length ? project.resources.join("\n") : "No uploaded resources"} />
      </SectionCard>

      <SectionCard title="Project Timelines">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}><InfoItem label="Target Start Date" value={project.targetStart || "Not available"} /></Grid>
          <Grid item xs={12} md={4}><InfoItem label="Target End Date" value={project.targetEnd || "Not available"} /></Grid>
        </Grid>
      </SectionCard>
    </>
  );
}
