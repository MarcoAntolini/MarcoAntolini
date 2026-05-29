import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

export default defineConfig({
	output: "server",
	adapter: vercel(),
	integrations: [react()],
	vite: {
		ssr: {
			external: ["prettier", "resend"],
		},
	},
});
