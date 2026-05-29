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
		gradient: "from-brand-zinc/95 via-brand-obsidian/90 to-[#ccb082]/25",
		glow: "bg-[#ccb082]/12",
		tag: "border-brand-border/80 bg-brand-obsidian/50 text-brand-muted",
		tagHover: "hover:border-[#ccb082]/45 hover:text-[#dcc9a6]",
		primaryBtn: "bg-[#ccb082] text-brand-obsidian hover:bg-[#ddc59c]",
		caseStudyRing: "border-[#ccb082]/45 text-[#ccb082] hover:bg-[#ccb082]/10",
		ghostHover: "hover:border-[#ccb082]/45 hover:text-[#dcc9a6]",
		imageBorder: "border-[#ccb082]/20",
	},
	csshub: {
		gradient: "from-brand-zinc/95 via-brand-obsidian/90 to-[#020617]/80",
		glow: "bg-sky-400/12",
		tag: "border-brand-border/80 bg-brand-obsidian/50 text-brand-muted",
		tagHover: "hover:border-sky-400/35 hover:text-sky-200/90",
		primaryBtn: "bg-sky-400 text-brand-obsidian hover:bg-sky-300",
		caseStudyRing: "border-sky-400/40 text-sky-300 hover:bg-sky-400/10",
		ghostHover: "hover:border-sky-400/35 hover:text-sky-200/90",
		imageBorder: "border-sky-400/20",
	},
	"fated-encounters": {
		gradient: "from-brand-zinc/95 via-brand-obsidian/90 to-[#173e32]/60",
		glow: "bg-[#173e32]/25",
		tag: "border-brand-border/80 bg-brand-obsidian/50 text-brand-muted",
		tagHover: "hover:border-[#2d6f5b]/45 hover:text-[#8fd6bd]",
		primaryBtn: "bg-[#173e32] text-brand-ivory hover:bg-[#1f5545]",
		ghostHover: "hover:border-[#2d6f5b]/45 hover:text-[#8fd6bd]",
		caseStudyRing: "border-[#2d6f5b]/45 text-[#8fd6bd] hover:bg-[#173e32]/20",
		imageBorder: "border-[#2d6f5b]/25",
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
	primaryBtn: "bg-brand-emerald text-brand-obsidian hover:bg-brand-emerald/85",
	caseStudyRing: "border-brand-emerald/40 text-brand-emerald hover:bg-brand-emerald/10",
	ghostHover: "hover:border-brand-emerald/35 hover:text-brand-ivory",
	imageBorder: "border-brand-border",
};

export function getProjectAccent(slug: string): ProjectAccent {
	return projectAccents[slug] ?? fallbackAccent;
}
