import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";
import Protected from "./auth/Protected.jsx";

import LoginPage from "../pages/LoginPage.jsx";
import OverviewPage from "../pages/Overview/OverviewPage.jsx";
import ProposalsPage from "../pages/Proposals/ProposalsPage.jsx";
import ProposalDetails from "../pages/Proposals/ProposalDetails.jsx"
import MonitoringPage from "../pages/Monitoring/MonitoringPage.jsx";
import ProjectDetails from "../pages/Monitoring/ProjectDetails.jsx";
import Assessment from "../pages/Assessment.jsx";
import Reports from "../pages/Reports.jsx";
import Profile from "../pages/Profile.jsx";

export default function RouterView() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/assessment" replace />} />
        <Route path="/overview" element={<Protected><OverviewPage /></Protected>} />
        <Route path="/proposals" element={<Protected><ProposalsPage /></Protected>} />
        <Route path="/proposals/:proposalId" element={<Protected><ProposalDetails /></Protected>} />
        <Route path="/monitoring" element={<Protected><MonitoringPage /></Protected>} />
        <Route path="/monitoring/:projectId" element={<Protected><ProjectDetails /></Protected>} />
        <Route path="/assessment" element={<Protected><Assessment /></Protected>} />
        <Route path="/reports" element={<Protected><Reports /></Protected>} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </AuthProvider>
  );
}
