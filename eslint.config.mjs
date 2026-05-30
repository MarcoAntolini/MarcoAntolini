import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
	{
		ignores: [
			"dist/**",
			".vercel/**",
			".astro/**",
			"node_modules/**",
			".next/**",
			"coverage/**",
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		languageOptions: {
			globals: {
				console: "readonly",
				document: "readonly",
				fetch: "readonly",
				IntersectionObserver: "readonly",
				localStorage: "readonly",
				module: "readonly",
				process: "readonly",
				Response: "readonly",
				window: "readonly",
			},
		},
	},
];
