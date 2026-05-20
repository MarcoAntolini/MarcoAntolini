"use client";

import { concepts, getConceptIndex, type Concept } from "@/content/concepts";
import { ChevronLeft, ChevronRight, Grid3X3, Home } from "lucide-react";

type ConceptNavProps = {
	concept: Concept;
};

export default function ConceptNav({ concept }: ConceptNavProps) {
	const index = getConceptIndex(concept.slug);
	const prev = index > 0 ? concepts[index - 1] : concepts[concepts.length - 1];
	const next = index < concepts.length - 1 ? concepts[index + 1] : concepts[0];

	return (
		<nav
			className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-950/90 px-2 py-2 shadow-2xl shadow-black/50 backdrop-blur-md"
			aria-label="Concept navigation"
		>
			<a
				href="/"
				className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
				title="Current portfolio"
			>
				<Home className="h-4 w-4" />
			</a>
			<a
				href="/concepts"
				className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
			>
				<Grid3X3 className="h-3.5 w-3.5" />
				Gallery
			</a>
			<span className="mx-1 h-5 w-px bg-zinc-700" />
			<a
				href={`/concepts/${prev.slug}`}
				className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
				title={prev.name}
			>
				<ChevronLeft className="h-4 w-4" />
			</a>
			<div className="px-2 text-center">
				<p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
					{index + 1} / {concepts.length}
				</p>
				<p className="text-xs font-semibold text-zinc-200">{concept.name}</p>
			</div>
			<a
				href={`/concepts/${next.slug}`}
				className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
				title={next.name}
			>
				<ChevronRight className="h-4 w-4" />
			</a>
		</nav>
	);
}
