import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Alert,
  Link,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../app/auth/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../data/sandata-logo.png";
import bagong from "../data/bagong-pilipinas.png";
import banner from "../data/banner.png";

const BANNER_MOBILE_HEIGHT = 240; // banner height on mobile (px)

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/assessment";

  useEffect(() => { if (user) navigate(from, { replace: true }); }, [user]);

  const [form, setForm] = useState({ username: "", password: "", remember: false });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const res = login(form.username.trim(), form.password, form.remember);
    if (!res.ok) return setError(res.error);
    setError("");
    navigate(from, { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: (t)=> t.palette.mode==='dark'? "#0b0f14" : "#f5f7fb",
        display: "grid",
        // Mobile: 1 column, 2 rows (banner fixed height + login takes rest of viewport)
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gridTemplateRows: {
          xs: `${BANNER_MOBILE_HEIGHT}px 1fr`,
          md: "minmax(0,1fr)",
        },
        position: "relative",
      }}
    >
      {/* LEFT PANEL / BANNER */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", md: "space-between" },
          color: "#fff",
          // ✅ Show banner on BOTH mobile and desktop
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: BANNER_MOBILE_HEIGHT, md: "100vh" },
        }}
      >
        {/* overlay (darker on desktop, lighter on mobile for legibility) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: { xs: "rgba(0,0,0,0.35)", md: "rgba(0,0,0,0.55)" },
          }}
        />

        {/* Title + Description */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 3, sm: 4, md: 6 },
            py: { xs: 2, sm: 3, md: 6 },
            flex: { xs: "0 0 auto", md: 1 },
            display: "flex",
            alignItems: { xs: "center", md: "center" },
          }}
        >
          <Box sx={{ maxWidth: 640 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <img src={logo} alt="SANDATA Systems Logo" width="44" height="44" style={{ borderRadius: 8 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.5, color: "#fff" }}>
                SANDATA
              </Typography>
            </Box>

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, lineHeight: 1.25, color: "#fff", display: { xs: "block", md: "none" } }}
            >
              Science-based Analytics to Detect Anomalies, Promote Transparency and Accountability
            </Typography>

            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3, color: "#fff", display: { xs: "none", md: "block" } }}
            >
              Science-based Analytics to Detect Anomalies, Promote Transparency and Accountability
            </Typography>

            <Typography
              variant="body2"
              sx={{ opacity: 0.95, mt: 1.5, color: "#f2f2f2", display: { xs: "none", md: "block" } }}
            >
              SANDATA Systems is an Anti-Fraud Technology Platform developed by the <b>DENR</b> and <b>PSBD, Inc.</b> that uses satellite imagery,
              spatial analytics, blockchain, and AI to detect and prevent anomalies in government-funded infrastructure projects. It has successfully
              identified potential fraud in over 3,000 projects and aims to become a national platform for transparent and science-based monitoring of
              public spending.
            </Typography>
          </Box>
        </Box>

        {/* Desktop footer */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
            px: { xs: 3, sm: 4, md: 6 },
            pb: 3,
          }}
        >
          <img src={bagong} width="36" height="36" alt="Bagong Pilipinas" style={{ borderRadius: 999 }} />
          <Typography variant="body2" sx={{ color: "#f2f2f2" }}>Bagong Pilipinas</Typography>
        </Box>
      </Box>

      {/* Optional vertical divider (desktop only) */}
      <Box
        aria-hidden
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          bgcolor: (t)=> (t.palette.mode==='dark' ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"),
          pointerEvents: "none",
        }}
      />

      {/* RIGHT PANEL / LOGIN */}
      <Box
        sx={{
          minHeight: { xs: `calc(100vh - ${BANNER_MOBILE_HEIGHT}px)`, md: "100vh" },
          bgcolor: (t)=> t.palette.mode==='dark'? "#0b0f14" : "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, sm: 4, md: 6 },
          py: { xs: 2, sm: 3, md: 6 },
        }}
      >
        <Paper elevation={6} sx={{ width: "100%", maxWidth: 420, p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={logo} alt="SANDATA Systems Logo" width="36" height="36" style={{ borderRadius: 4 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5, userSelect: "none" }}>
              SANDATA Systems
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
            Please sign in with your administrator credentials.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={onSubmit} noValidate>
            <TextField
              fullWidth
              label="Username"
              name="username"
              placeholder="ICI_Philippines"
              value={form.username}
              onChange={onChange}
              margin="normal"
              required
              autoComplete="username"
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              placeholder="Sandata2025!"
              value={form.password}
              onChange={onChange}
              margin="normal"
              required
              autoComplete="current-password"
            />

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
              <FormControlLabel control={<Checkbox name="remember" checked={form.remember} onChange={onChange} />} label="Remember me" />
              <Link component="button" type="button" underline="hover" onClick={()=>{}} sx={{ cursor: "not-allowed", opacity: 0.7 }}>
                Forgot password?
              </Link>
            </Box>

            <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }} startIcon={<LockIcon />}>
              Sign in
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="caption" display="block" align="center" sx={{ opacity: 0.7 }}>
            For demo use only. Use <b>ICI_Philippines</b> / <b>Sandata2025!</b> to log in.
          </Typography>
        </Paper>

        {/* Mobile footer */}
        <Box
          sx={{
            mt: 4,
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            pb: 2,
          }}
        >
          <img src={bagong} width="36" height="36" alt="Bagong Pilipinas" style={{ borderRadius: 999 }} />
          <Typography variant="body2">Bagong Pilipinas</Typography>
        </Box>
      </Box>
    </Box>
  );
}
