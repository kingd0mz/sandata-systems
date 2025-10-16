import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
// const VALID_USERNAME = "ICI_Philippines";
// const VALID_PASSWORD = "Sandata2025!";

const VALID_USERNAME = "test";
const VALID_PASSWORD = "test";

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sandata_auth");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password, remember) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const payload = { username };
      if (remember) localStorage.setItem("sandata_auth", JSON.stringify(payload));
      else localStorage.removeItem("sandata_auth");
      setUser(payload);
      return { ok: true };
    }
    return { ok: false, error: "Incorrect username or password." };
  };

  const logout = () => {
    localStorage.removeItem("sandata_auth");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
