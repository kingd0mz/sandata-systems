import React from "react";
import { Stack, Chip } from "@mui/material";

export default function FlagChips({ flags }) {
  const chips = [];
  if (flags?.similarProject) chips.push(<Chip key="similar" label="Similar Project" size="small" sx={{ bgcolor:"#9e9e9e", color:"#fff" }} />);
  if (flags?.poorlySituated) chips.push(<Chip key="poor" label="Poorly Situated" size="small" color="error" />);
  if (flags?.contractorIssues) chips.push(<Chip key="contractor" label="Issues with Contractor" size="small" color="warning" />);
  return <Stack direction="row" spacing={0.5} flexWrap="wrap">{chips}</Stack>;
}
