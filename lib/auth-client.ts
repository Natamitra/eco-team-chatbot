import { createAuthClient } from "better-auth/client";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://eco-team-chatbot.vercel.app",
  plugins: [emailOTPClient()],
});