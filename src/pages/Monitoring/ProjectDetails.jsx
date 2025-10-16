import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar.jsx";
import Footer from "../../components/Footer.jsx";
import ProjectHeader from "../../components/project/ProjectHeader.jsx";
import ProjectSidebar from "../../components/project/ProjectSidebar.jsx";

import ProjectDetailsTab from "../../components/project/tabs/ProjectDetailsTab.jsx";
import ArticlesTab from "../../components/project/tabs/ArticlesTab.jsx";
import UpdatesTab from "../../components/project/tabs/UpdatesTab.jsx";
import FeedbackTab from "../../components/project/tabs/FeedbackTab.jsx";
import TransactionsTab from "../../components/project/tabs/TransactionsTab.jsx";

const project = {
  // EXACT content you specified
  title: "Construction of Flood Mitigation Structure along Cagayan de Oro River (Cabula Section 1), Cagayan de Oro City, Misamis Oriental",
  code: "320102107609000",
  location: "Lumbia, Cagayan de Oro City, Misamis Oriental, Northern Mindanao, 9000",
  lat: 8.4081,
  lng: 124.5922,
  contractor: null, // No Data Available
  implementingAgency: "Department of Public Works and Highways",
  status: "Not Yet Started",
  program: "Flood Control Infrastructure",
  createdOn: "August 14, 2025",

  budget: "PHP 100,000,000.00",
  fundSource: "General Appropriations Act FY 2025",
  disbursement: "Not available",

  resources: [],

  targetStart: "Not available",
  targetEnd: "Not available",

  // header metrics (for the top strip)
  startDate: "—",
  completionDate: "—",
  updates: 0,
};

export default function ProjectDetails() {
  const { projectId } = useParams(); // currently unused (hardcoded)
  const [activeTab, setActiveTab] = useState("Project Details");

   const metrics = [
    { label: "Budget Utilization / Disbursement", value: "Not available", tone: "neutral" }, // no data yet
    { label: "Start Date", value: "Not available", tone: "warning" },         // missing key date
    { label: "Completion Date", value: "Not available", tone: "warning" },    // missing key date
    { label: "Updates", value: "1", tone: "info" },                           // some activity
    { label: "Budget", value: "PHP 100,000,000.00", tone: "neutral" },        // informational
    { label: "Implementing Agency", value: "Department of Public Works and Highways", tone: "neutral" },
          ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopBar />
      <Box sx={{ flex: 1, display: "flex" }}>
        <ProjectSidebar active={activeTab} onSelect={setActiveTab} />
        <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            {project.title}
          </Typography>
          <ProjectHeader metrics={metrics} />

          {activeTab === "Project Details" && <ProjectDetailsTab project={project} />}
          {activeTab === "Articles & Publications" && <ArticlesTab />}
          {activeTab === "Project Updates" && (<UpdatesTab center={[project.lat, project.lng]} />)}
          {activeTab === "Feedback (ARNISS)" && <FeedbackTab />}
          {activeTab === "Transactions" && <TransactionsTab />}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
