"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [step, setStep] = useState<"login" | "newPassword">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    if (!email || !password) {
      setError("Wpisz email i hasło.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.firstLogin) {
      setStep("newPassword");
    } else if (data.success) {
      window.location.href = "/";
    } else {
      setError(data.error || "Błąd logowania.");
    }
  };

  const setNewPass = async () => {
    if (newPassword.length < 8) {
      setError("Hasło musi mieć minimum 8 znaków.");
      return;
    }
    if (newPassword !== newPassword2) {
      setError("Hasła nie są takie same.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, newPassword }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      window.location.href = "/";
    } else {
      setError(data.error || "Błąd.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f4f0" }}>
      <div style={{ background: "#fff", padding: 40, borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", width: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌿</div>
          <h1 style={{ color: "#1a4731", margin: "8px 0 4px" }}>ECO-TEAM</h1>
          <p style={{ color: "#666", fontSize: 14 }}>Asystent Onboardingowy</p>
        </div>

        {step === "login" ? (
          <>
            <p style={{ color: "#444", marginBottom: 16, fontSize: 14 }}>Wpisz swój służbowy email i hasło.</p>
            <input
              type="email"
              placeholder="imie@eco-team.net"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ddd", fontSize: 15, marginBottom: 12, boxSizing: "border-box" }}
            />
            <input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ddd", fontSize: 15, marginBottom: 12, boxSizing: "border-box" }}
            />
            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            <button onClick={login} disabled={loading} style={{ width: "100%", padding: 14, background: loading ? "#aaa" : "#1a4731", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, cursor: "pointer" }}>
              {loading ? "Logowanie..." : "Zaloguj się"}
            </button>
          </>
        ) : (
          <>
            <p style={{ color: "#1a4731", fontWeight: "bold", marginBottom: 8 }}>Pierwsze logowanie!</p>
            <p style={{ color: "#444", marginBottom: 16, fontSize: 14 }}>Ustaw swoje własne hasło (min. 8 znaków).</p>
            <input
              type="password"
              placeholder="Nowe hasło"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ddd", fontSize: 15, marginBottom: 12, boxSizing: "border-box" }}
            />
            <input
              type="password"
              placeholder="Powtórz nowe hasło"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setNewPass()}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ddd", fontSize: 15, marginBottom: 12, boxSizing: "border-box" }}
            />
            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            <button onClick={setNewPass} disabled={loading} style={{ width: "100%", padding: 14, background: loading ? "#aaa" : "#1a4731", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, cursor: "pointer" }}>
              {loading ? "Zapisywanie..." : "Ustaw hasło i zaloguj się"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}