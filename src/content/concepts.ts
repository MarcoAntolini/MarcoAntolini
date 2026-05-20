export type Concept = {
	slug: string;
	name: string;
	tagline: string;
	inspiration: string;
	differentiator: string;
	mood: string;
	accent: string;
};

export const concepts: Concept[] = [
	{
		slug: "orbit",
		name: "Mission Orbit",
		tagline: "Your career as a space briefing — scroll to launch each phase",
		inspiration: "Gil Itzhaky (gilitz.com), Akshay Santhoshkumar — 3D adventure portfolios",
		differentiator: "Animated starfield, orbital HUD, scroll-driven mission log",
		mood: "Cinematic · sci-fi · ambitious",
		accent: "#22d3ee",
	},
	{
		slug: "split",
		name: "Split Persona",
		tagline: "Drag the divider — student Marco vs. shipper Marco",
		inspiration: "Adham Dannaway — designer/developer split-screen reveal",
		differentiator: "Interactive before/after slider with contrasting narratives",
		mood: "Dual identity · tactile · memorable",
		accent: "#f97316",
	},
	{
		slug: "blueprint",
		name: "Living Blueprint",
		tagline: "Portfolio as technical drawings that trace themselves in",
		inspiration: "Abdul Rehman Waseem (3D specialist), creative technologist portfolios",
		differentiator: "SVG path-draw animations, dimension lines, grid paper",
		mood: "Precise · engineered · confident",
		accent: "#38bdf8",
	},
	{
		slug: "constellation",
		name: "Constellation Map",
		tagline: "Skills as stars — connect the dots to unlock your story",
		inspiration: "Mees Verberne, Michal Grzebisz — creative frontend storytelling",
		differentiator: "Interactive star field with hover constellations per skill group",
		mood: "Cosmic · exploratory · poetic",
		accent: "#a78bfa",
	},
	{
		slug: "evidence",
		name: "Evidence Board",
		tagline: "Detective cork board — projects pinned with red string connections",
		inspiration: "Narrative portfolios, Rajneesh Tiwari (creative technologist)",
		differentiator: "Polaroid cards, animated pins, string topology on hover",
		mood: "Investigative · personal · story-driven",
		accent: "#ef4444",
	},
	{
		slug: "vinyl",
		name: "Vinyl Sessions",
		tagline: "Each project is a track — spin the deck, read the liner notes",
		inspiration: "Aman Rai (GSAP animations), Wesker Shek (creative developer)",
		differentiator: "Rotating vinyl selector, waveform visualizer, track metadata",
		mood: "Rhythmic · warm · audio-visual",
		accent: "#f59e0b",
	},
	{
		slug: "arcade",
		name: "Pixel Arcade",
		tagline: "Insert coin — play through project levels on a CRT cabinet",
		inspiration: "Althruist (game dev), Ghom Krosmonaute — gamified portfolios",
		differentiator: "8-bit aesthetic, blinking marquee, level-select for projects",
		mood: "Playful · nostalgic · bold",
		accent: "#84cc16",
	},
	{
		slug: "fold",
		name: "Origami Fold",
		tagline: "Unfold paper panels to reveal each chapter of your path",
		inspiration: "Framer motion portfolios (Sawad, Saptarshi Mandal), Tajmirul Islam",
		differentiator: "3D CSS fold transitions, paper texture, sequential reveals",
		mood: "Tactile · elegant · surprising",
		accent: "#ec4899",
	},
	{
		slug: "signal",
		name: "Shortwave Signal",
		tagline: "Tune the dial — each frequency broadcasts a different section",
		inspiration: "Vintage interactive UIs, Torben Korb (digital-creative.de)",
		differentiator: "Rotary tuner, static noise transitions, station labels",
		mood: "Analog · mysterious · immersive",
		accent: "#eab308",
	},
	{
		slug: "kinetic",
		name: "Kinetic Type",
		tagline: "Letters scatter and reassemble as you scroll through proof",
		inspiration: "Tajmirul Islam (tajmirul.site), Seth Hall Creative — motion typography",
		differentiator: "Giant MARCO letter sculpture, scroll-linked letter physics",
		mood: "Bold · typographic · high-impact",
		accent: "#ffffff",
	},
];

export type ConceptSlug = (typeof concepts)[number]["slug"];

export function getConceptBySlug(slug: string): Concept | undefined {
	return concepts.find((c) => c.slug === slug);
}

export function getConceptIndex(slug: string): number {
	return concepts.findIndex((c) => c.slug === slug);
}
