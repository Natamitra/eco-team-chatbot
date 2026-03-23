"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOTP = async () => {
    if (!email.endsWith("@eco-team.net")) {
      setError("Tylko adresy @eco-team.net są dozwolone.");
      return;
    }
    setLoading(true);
    setError("");
    const { error: err } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    setLoading(false);
    if (err) setError("Błąd: " + err.message);
    else setStep("otp");
  };

  const verifyOTP = async () => {
    setLoading(true);
    setError("");
    const { error: err } = await authClient.signIn.emailOtp({ email, otp });
    setLoading(false);
    if (err) setError("Nieprawidłowy kod: " + err.message);
    else window.location.href = "/";
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f4f0" }}>
      <div style={{ background: "#fff", padding: 40, borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", width: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌿</div>
          <h1 style={{ color: "#1a4731", margin: "8px 0 4px" }}>ECO-TEAM</h1>
          <p style={{ color: "#666", fontSize: 14 }}>Asystent Onboardingowy</p>
        </div>

        {step === "email" ? (
          <>
            <p style={{ color: "#444", marginBottom: 16, fontSize: 14 }}>Wpisz swój służbowy email.</p>
            <input
              type="email"
              placeholder="imie@eco-team.net"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendOTP()}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ddd", fontSize: 15, marginBottom: 12, boxSizing: "border-box" }}
            />
            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            <button onClick={sendOTP} disabled={loading} style={{ width: "100%", padding: 14, background: loading ? "#aaa" : "#1a4731", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, cursor: "pointer" }}>
              {loading ? "Wysyłanie..." : "Wyślij kod logowania"}
            </button>
          </>
        ) : (
          <>
            <p style={{ color: "#444", marginBottom: 16, fontSize: 14 }}>Wysłaliśmy kod na <strong>{email}</strong>.</p>
            <input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verifyOTP()}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ddd", fontSize: 24, marginBottom: 12, boxSizing: "border-box", letterSpacing: 8, textAlign: "center" }}
            />
            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            <button onClick={verifyOTP} disabled={loading} style={{ width: "100%", padding: 14, background: loading ? "#aaa" : "#1a4731", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, cursor: "pointer" }}>
              {loading ? "Sprawdzanie..." : "Zaloguj się"}
            </button>
            <button onClick={() => { setStep("email"); setError(""); }} style={{ width: "100%", padding: 10, background: "transparent", color: "#666", border: "none", fontSize: 13, cursor: "pointer", marginTop: 8 }}>
              ← Zmień email
            </button>
          </>
        )}
      </div>
    </div>
  );
}