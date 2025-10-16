import React, { useMemo, useState } from "react";
import { Box, Typography, Stack, Button, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar.jsx";
import Footer from "../../components/Footer.jsx";
import ProposalHeader from "../../components/proposals/ProposalHeader.jsx";
import ProposalSidebar from "../../components/proposals/ProposalsSidebar.jsx"

import ProjectDetailsTab from "../../components/project/tabs/ProjectDetailsTab.jsx";
import EvaluationTab from "../../components/proposals/EvaluationTab.jsx";
import AttachmentsTab from "../../components/proposals/AttachmentsTab.jsx";

const baseProposal = {
  id: "P-2026-001",
  title: "Riverbank Protection - Cabula Section 2, Cagayan de Oro City",
  code: "PROPOSAL-2026-001",
  location: "Lumbia, Cagayan de Oro City, Misamis Oriental, Northern Mindanao, 9000",
  lat: 8.4081, lng: 124.5922,
  contractor: "—", implementingAgency: "DPWH",
  status: "Under Review", program: "Flood Control Infrastructure",
  createdOn: "—", proponent: "DPWH R10",
  budget: "PHP 120,000,000.00", fundSource: "Proposed GAA FY 2026", disbursement: "—",
  submitted: "2025-09-14", similarCount: 1, resources: [],
  targetStart: "Not available", targetEnd: "Not available",
  startDate: "—", completionDate: "—", updates: 1,
};

export default function ProposalDetails(){
  const { proposalId } = useParams();
  const [activeTab, setActiveTab] = useState("Project Details");
  const [decision, setDecision] = useState(null);
  const [toast, setToast] = useState({ open:false, msg:"", sev:"success" });

  const proposal = useMemo(()=> decision ? { ...baseProposal, status: decision } : baseProposal, [decision]);

  const approve = () => { setDecision("Approved"); setToast({open:true, msg:"Proposal marked as Approved (mock).", sev:"success"}); };
  const reject  = () => { setDecision("Rejected"); setToast({open:true, msg:"Proposal marked as Rejected (mock).", sev:"warning"}); };

  return (
    <Box sx={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      <TopBar />

      <Box sx={{ flex:1, display:"flex" }}>
        <ProposalSidebar active={activeTab} onSelect={setActiveTab} />

        <Box sx={{ flex:1, p:3, overflowY:"auto" }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight={700}>{proposal.title}</Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" color="error" onClick={reject}>Reject</Button>
              <Button variant="contained" color="success" onClick={approve}>Approve</Button>
            </Stack>
          </Stack>

          <ProposalHeader proposal={proposal} />

          {activeTab === "Project Details" && <ProjectDetailsTab project={proposal} />}
          {activeTab === "Evaluation" && <EvaluationTab center={[proposal.lat, proposal.lng]} />}
          {activeTab === "Attachments" && <AttachmentsTab />}

          <Snackbar open={toast.open} autoHideDuration={2200} onClose={()=>setToast(s=>({...s, open:false}))}
            anchorOrigin={{ vertical:"bottom", horizontal:"right" }}>
            <Alert severity={toast.sev} variant="filled" sx={{ width:"100%" }}>{toast.msg}</Alert>
          </Snackbar>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
