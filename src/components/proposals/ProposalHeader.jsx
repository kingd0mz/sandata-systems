import React from "react";
import ProjectHeader from "../project/ProjectHeader.jsx";

/**
 * Thin wrapper — reuse our single-line ProjectHeader with proposal-centric metrics.
 */
export default function ProposalHeader({ proposal }) {
  const metrics = [
    { label: "Status", value: proposal.status, tone:
      proposal.status === "Approved" ? "success" :
      proposal.status === "Rejected" ? "error" :
      proposal.status === "Under Review" ? "warning" : "info"
    },
    { label: "Proposed Budget", value: proposal.budget },
    { label: "Proponent", value: proposal.proponent },
    { label: "Implementing Agency", value: proposal.implementingAgency },
    { label: "Date Submitted", value: proposal.submitted },
    { label: "Flagged (Similar)", value: proposal.similarCount?.toString() ?? "0", tone: proposal.similarCount > 0 ? "warning" : "neutral" },
  ];
  return <ProjectHeader metrics={metrics} />;
}
