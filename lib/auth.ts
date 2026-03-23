import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "https://eco-team-chatbot.vercel.app",
    "http://localhost:3000",
  ],
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          // TYMCZASOWO: onboarding@resend.dev
          // DOCELOWO (po weryfikacji domeny przez Łukasza):
          // from: "onboarding@eco-team.net",
          from: "onboarding@resend.dev",
          to: email,
          subject: "Twój kod logowania — ECO-TEAM",
          html: `
            <div style="font-family:sans-serif;max-width:400px;margin:40px auto;padding:32px;border-radius:12px;border:1px solid #e0e0e0;">
              <h2 style="color:#1a4731;margin-bottom:8px;">🌿 ECO-TEAM</h2>
              <p style="color:#444;font-size:15px;">Twój jednorazowy kod logowania:</p>
              <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#1a4731;margin:24px 0;text-align:center;">${otp}</div>
              <p style="color:#888;font-size:13px;">Kod jest ważny przez 10 minut.<br/>Jeśli to nie Ty, zignoruj tę wiadomość.</p>
            </div>
          `,
        });
      },
    }),
  ],
});