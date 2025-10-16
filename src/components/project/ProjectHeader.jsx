import React from "react";
import { Box, Paper, Typography, LinearProgress, useTheme } from "@mui/material";

/**
 * Project Header — Single-line horizontal metrics bar
 * Props:
 *  metrics = [{ label, value, tone }]
 */
export default function ProjectHeader({ metrics = [] }) {
  const theme = useTheme();

  const toneToColor = (tone) => {
    switch (tone) {
      case "success": return theme.palette.success.main;
      case "warning": return theme.palette.warning.main;
      case "error":   return theme.palette.error.main;
      case "info":    return theme.palette.info.main;
      default:        return theme.palette.divider;
    }
  };

  const parsePercent = (val) => {
    if (!val) return null;
    const m = String(val).trim().match(/^(\d+(?:\.\d+)?)\s*%$/);
    return m ? Math.max(0, Math.min(100, Number(m[1]))) : null;
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        p: 2,
        mb: 3,
        bgcolor: theme.palette.mode === "dark" ? "#1c1f23" : "#f9fafb",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          minWidth: "max-content",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        {metrics.map((m, i) => {
          const color = toneToColor(m.tone || "neutral");
          const pct = parsePercent(m.value);

          return (
            <Box
              key={i}
              sx={{
                flex: "1 1 0",
                minWidth: 130,
                textAlign: "center",
                borderLeft: i === 0 ? "none" : `1px solid ${theme.palette.divider}`,
                px: 2,
              }}
            >
              {/* Label */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {m.label}
              </Typography>

              {/* Value */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mt: 0.5,
                  overflowWrap: "anywhere",
                }}
              >
                {m.value ?? "—"}
              </Typography>

              {/* Optional mini progress */}
              {pct !== null && (
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  sx={{
                    mt: 1,
                    height: 5,
                    borderRadius: 999,
                    "& .MuiLinearProgress-bar": { backgroundColor: color },
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
