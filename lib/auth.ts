import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: false,
  },
  emailOTP: {
    enabled: true,
    sendVerificationOTP: async ({ email, otp }: { email: string; otp: string }) => {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Twój kod logowania - ECO-TEAM",
        html: `<p>Twój kod logowania: <strong>${otp}</strong></p><p>Kod jest ważny przez 10 minut.</p>`,
      });
    },
    allowedDomains: ["eco-team.net"],
  },
});