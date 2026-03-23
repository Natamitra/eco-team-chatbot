"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f0", display: "flex", flexDirection: "column" }}>
      {/* Nagłówek */}
      <div style={{ background: "#1a4731", color: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 28 }}>🌿</span>
        <div>
          <div style={{ fontWeight: "bold", fontSize: 18 }}>ECO-TEAM</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>Asystent Onboardingowy</div>
        </div>
      </div>

      {/* Wiadomości */}
      <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "#888", marginTop: 60 }}>
            <div style={{ fontSize: 48 }}>🌿</div>
            <p style={{ fontSize: 16, marginTop: 12 }}>Cześć! Jestem Twoim asystentem onboardingowym ECO-TEAM.</p>
            <p style={{ fontSize: 14 }}>Zapytaj mnie o cokolwiek!</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "70%", padding: "12px 16px", borderRadius: 16,
              background: msg.role === "user" ? "#1a4731" : "#fff",
              color: msg.role === "user" ? "#fff" : "#333",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              fontSize: 15, lineHeight: 1.5,
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#fff", padding: "12px 16px", borderRadius: 16, color: "#888", fontSize: 15 }}>
              Piszę...
            </div>
          </div>
        )}
      </div>

      {/* Pole wpisywania */}
      <div style={{ padding: 16, background: "#fff", borderTop: "1px solid #e0e0e0", display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Wpisz wiadomość..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: "12px 16px", borderRadius: 24, border: "1px solid #ddd", fontSize: 15, outline: "none" }}
        />
        <button onClick={sendMessage} disabled={loading} style={{
          padding: "12px 20px", background: "#1a4731", color: "#fff",
          border: "none", borderRadius: 24, fontSize: 15, cursor: "pointer"
        }}>
          Wyślij
        </button>
      </div>
    </div>
  );
}