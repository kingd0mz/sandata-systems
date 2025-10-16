import React, { useEffect, useState } from "react";
import { Box, Paper, Container, Typography, TextField, FormControlLabel, Checkbox, Button, Divider, Alert, Link } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../app/auth/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage(){
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/overview";

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
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: (t)=> t.palette.mode==='dark'? "#0b0f14" : "#f5f7fb" }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="/logos/sandata-logo.png"
              alt="SANDATA Systems Logo"
              width="36"
              height="36"
              style={{ borderRadius: 4 }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.5, userSelect: "none" }}
            >
              SANDATA Systems
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>Please sign in with your administrator credentials.</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={onSubmit}>
            <TextField fullWidth label="Username" name="username" placeholder="ICI_Philippines" value={form.username} onChange={onChange} margin="normal" required />
            <TextField fullWidth type="password" label="Password" name="password" placeholder="Sandata2025!" value={form.password} onChange={onChange} margin="normal" required />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
              <FormControlLabel control={<Checkbox name="remember" checked={form.remember} onChange={onChange} />} label="Remember me" />
              <Link component="button" type="button" underline="hover" onClick={()=>{}} sx={{ cursor: "not-allowed", opacity: 0.7 }}>Forgot password?</Link>
            </Box>
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>Sign in</Button>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
            <img src="/logos/bagong-pilipinas.png" width="36" height="36" alt="Bagong Pilipinas" style={{ borderRadius: 999 }} />
            <Typography variant="body2">Bagong Pilipinas</Typography>
          </Box>
        </Paper>
        <Typography variant="caption" display="block" align="center" sx={{ mt: 2, opacity: 0.7 }}>
          For demo use only. Use <b>ICI_Philippines</b> / <b>Sandata2025!</b> to log in.
        </Typography>
      </Container>
    </Box>
  );
}
