// toy utilities mimicking “science-based oversight/AI flags” (hard-coded)
export function deriveProposalFlags(p) {
  // already in mock; this file shows how you could compute if needed
  return p.flags
}

export function statusBadge(p) {
  if (p.flags.duplicate || p.flags.poorPlan || p.flags.hazard) return 'REVIEW'
  return 'CLEAR'
}
