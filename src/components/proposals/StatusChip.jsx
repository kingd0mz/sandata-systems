import React from "react";
import { Chip } from "@mui/material";

const colorMap = {
  Draft: "default",
  Submitted: "info",
  "Under Review": "warning",
  Approved: "success",
  Rejected: "error",
};

export default function StatusChip({ status }) {
  const color = colorMap[status] ?? "default";
  return <Chip label={status} color={color} size="small" />;
}
