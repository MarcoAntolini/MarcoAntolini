import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

export default defineConfig({
	output: "server",
	adapter: vercel(),
	integrations: [react(), tailwind({ applyBaseStyles: false })],
	vite: {
		ssr: {
			external: ["prettier", "resend"],
		},
	},
});
