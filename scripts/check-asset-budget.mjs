import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const assetsRoot = path.join(root, "public", "projects");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const budgets = {
	icon: 100 * 1024,
	image: 250 * 1024,
};

async function walk(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const fullPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walk(fullPath)));
			continue;
		}
		files.push(fullPath);
	}

	return files;
}

function budgetFor(filePath) {
	return filePath.includes(`${path.sep}icons${path.sep}`) ? budgets.icon : budgets.image;
}

function formatBytes(bytes) {
	return `${Math.ceil(bytes / 1024)}KB`;
}

const files = (await walk(assetsRoot)).filter((filePath) => imageExtensions.has(path.extname(filePath).toLowerCase()));
const failures = [];

for (const filePath of files) {
	const { size } = await stat(filePath);
	const budget = budgetFor(filePath);

	if (size > budget) {
		failures.push({
			filePath: path.relative(root, filePath),
			size,
			budget,
		});
	}
}

if (failures.length > 0) {
	console.error("Asset budget exceeded:");
	for (const failure of failures) {
		console.error(`- ${failure.filePath}: ${formatBytes(failure.size)} over ${formatBytes(failure.budget)}`);
	}
	process.exit(1);
}

console.log(`Asset budget passed for ${files.length} project image assets.`);
