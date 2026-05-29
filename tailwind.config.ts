import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				satoshi: ["var(--font-satoshi)", "system-ui", "sans-serif"],
				"space-mono": ["var(--font-space-mono)", "ui-monospace", "monospace"],
			},
			colors: {
				brand: {
					obsidian: "#09090b",
					zinc: "#18181b",
					elevated: "#1f1f23",
					border: "#27272a",
					ivory: "#f4f1eb",
					muted: "#a1a1aa",
					emerald: "#34d399",
					teal: "#0f766e",
					amber: "#f59e0b",
				},
			},
			animation: {
				"fade-up": "fade-up 0.7s ease-out forwards",
			},
			keyframes: {
				"fade-up": {
					"0%": { opacity: "0", transform: "translateY(16px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [],
};

export default config;
