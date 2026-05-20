"use client";

import { type ConceptSlug } from "@/content/concepts";
import ArcadePortfolio from "./arcade-portfolio";
import BlueprintPortfolio from "./blueprint-portfolio";
import ConstellationPortfolio from "./constellation-portfolio";
import EvidencePortfolio from "./evidence-portfolio";
import FoldPortfolio from "./fold-portfolio";
import KineticPortfolio from "./kinetic-portfolio";
import OrbitPortfolio from "./orbit-portfolio";
import SignalPortfolio from "./signal-portfolio";
import SplitPortfolio from "./split-portfolio";
import VinylPortfolio from "./vinyl-portfolio";

type ConceptPortfolioProps = {
	slug: ConceptSlug | string;
};

export default function ConceptPortfolio({ slug }: ConceptPortfolioProps) {
	switch (slug) {
		case "orbit":
			return <OrbitPortfolio />;
		case "split":
			return <SplitPortfolio />;
		case "blueprint":
			return <BlueprintPortfolio />;
		case "constellation":
			return <ConstellationPortfolio />;
		case "evidence":
			return <EvidencePortfolio />;
		case "vinyl":
			return <VinylPortfolio />;
		case "arcade":
			return <ArcadePortfolio />;
		case "fold":
			return <FoldPortfolio />;
		case "signal":
			return <SignalPortfolio />;
		case "kinetic":
			return <KineticPortfolio />;
		default:
			return (
				<div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
					<p>Concept not found.</p>
				</div>
			);
	}
}
