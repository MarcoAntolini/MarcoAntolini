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
					obsidian: "rgb(var(--brand-obsidian) / <alpha-value>)",
					zinc: "rgb(var(--brand-zinc) / <alpha-value>)",
					elevated: "rgb(var(--brand-elevated) / <alpha-value>)",
					border: "rgb(var(--brand-border) / <alpha-value>)",
					ivory: "rgb(var(--brand-ivory) / <alpha-value>)",
					muted: "rgb(var(--brand-muted) / <alpha-value>)",
					emerald: "rgb(var(--brand-emerald) / <alpha-value>)",
					teal: "rgb(var(--brand-teal) / <alpha-value>)",
					amber: "rgb(var(--brand-amber) / <alpha-value>)",
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
