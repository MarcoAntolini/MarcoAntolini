import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
				body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
				mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
				satoshi: ["var(--font-satoshi)", "system-ui", "sans-serif"],
				"space-mono": ["var(--font-space-mono)", "ui-monospace", "monospace"],
			},
			colors: {
				craft: {
					bg: "rgb(var(--color-bg) / <alpha-value>)",
					surface: "rgb(var(--color-surface) / <alpha-value>)",
					border: "rgb(var(--color-border) / <alpha-value>)",
					foreground: "rgb(var(--color-foreground) / <alpha-value>)",
					muted: "rgb(var(--color-muted) / <alpha-value>)",
					accent: "rgb(var(--color-accent) / <alpha-value>)",
				},
				// v2 identity palette — sourced from the MA brand kit (brandkit.png)
				v2: {
					obsidian: "#09090b",
					zinc: "#18181b",
					border: "#27272a",
					ivory: "#f4f1eb",
					muted: "#a1a1aa",
					emerald: "#34d399",
					teal: "#0f766e",
					amber: "#f59e0b",
				},
				// brand identity palette — MA brand kit (brandkit.png). Shared, version-agnostic.
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
