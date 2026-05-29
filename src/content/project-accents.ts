/** Per-project accent tokens — tuned to each product logo / brand color. */
export type ProjectAccent = {
	gradient: string;
	glow: string;
	tag: string;
	tagHover: string;
	primaryBtn: string;
	/** Optional second CTA (e.g. VS Code marketplace) */
	secondaryBtn?: string;
	caseStudyRing: string;
	ghostHover: string;
	imageBorder: string;
};

export const projectAccents: Record<string, ProjectAccent> = {
	"dracania-archives": {
		gradient: "from-brand-zinc/95 via-brand-obsidian/90 to-orange-950/35",
		glow: "bg-orange-500/12",
		tag: "border-brand-border/80 bg-brand-obsidian/50 text-brand-muted",
		tagHover: "hover:border-orange-500/35 hover:text-orange-200/90",
		primaryBtn: "bg-orange-600 text-brand-obsidian hover:bg-orange-500",
		caseStudyRing: "border-orange-500/40 text-orange-400 hover:bg-orange-500/10",
		ghostHover: "hover:border-orange-500/35 hover:text-orange-200/90",
		imageBorder: "border-orange-500/20",
	},
	csshub: {
		gradient: "from-brand-zinc/95 via-brand-obsidian/90 to-yellow-950/35",
		glow: "bg-yellow-500/12",
		tag: "border-brand-border/80 bg-brand-obsidian/50 text-brand-muted",
		tagHover: "hover:border-yellow-500/35 hover:text-yellow-200/90",
		primaryBtn: "bg-yellow-400 text-brand-obsidian hover:bg-yellow-300",
		caseStudyRing: "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10",
		ghostHover: "hover:border-yellow-500/35 hover:text-yellow-200/90",
		imageBorder: "border-yellow-500/20",
	},
	"fated-encounters": {
		gradient: "from-brand-zinc/95 via-brand-obsidian/90 to-emerald-950/35",
		glow: "bg-emerald-500/12",
		tag: "border-brand-border/80 bg-brand-obsidian/50 text-brand-muted",
		tagHover: "hover:border-emerald-500/35 hover:text-emerald-200/90",
		primaryBtn: "bg-emerald-500 text-brand-obsidian hover:bg-emerald-400",
		ghostHover: "hover:border-emerald-500/35 hover:text-emerald-200/90",
		caseStudyRing: "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10",
		imageBorder: "border-emerald-500/20",
	},
	"ts-hover": {
		gradient: "from-brand-zinc/95 via-brand-obsidian/90 to-sky-950/35",
		glow: "bg-sky-500/12",
		tag: "border-brand-border/80 bg-brand-obsidian/50 text-brand-muted",
		tagHover: "hover:border-sky-500/35 hover:text-sky-200/90",
		primaryBtn: "bg-sky-500 text-brand-obsidian hover:bg-sky-400",
		secondaryBtn:
			"border-sky-500/35 bg-sky-500/10 text-sky-200 hover:border-sky-400/50 hover:bg-sky-500/15",
		ghostHover: "hover:border-sky-500/35 hover:text-sky-200/90",
		caseStudyRing: "border-sky-500/40 text-sky-400 hover:bg-sky-500/10",
		imageBorder: "border-sky-500/20",
	},
};

const fallbackAccent: ProjectAccent = {
	gradient: "from-brand-zinc/95 via-brand-obsidian/90 to-brand-elevated/80",
	glow: "bg-brand-emerald/8",
	tag: "border-brand-border/80 bg-brand-obsidian/50 text-brand-muted",
	tagHover: "hover:border-brand-emerald/35 hover:text-brand-ivory",
	primaryBtn: "bg-brand-emerald text-brand-obsidian hover:bg-emerald-300",
	caseStudyRing: "border-brand-emerald/40 text-brand-emerald hover:bg-brand-emerald/10",
	ghostHover: "hover:border-brand-emerald/35 hover:text-brand-ivory",
	imageBorder: "border-brand-border",
};

export function getProjectAccent(slug: string): ProjectAccent {
	return projectAccents[slug] ?? fallbackAccent;
}
