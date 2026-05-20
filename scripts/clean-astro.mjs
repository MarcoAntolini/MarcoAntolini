import { rmSync } from "node:fs";

const targets = [
	"dist",
	".astro",
	".next",
	".vercel",
	"out",
	"build",
	"tsconfig.tsbuildinfo",
];

for (const target of targets) {
	try {
		rmSync(target, { recursive: true, force: true });
		console.log(`removed ${target}`);
	} catch {
		// ignore
	}
}
