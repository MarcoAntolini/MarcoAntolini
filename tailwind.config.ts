import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
				body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
				mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
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
