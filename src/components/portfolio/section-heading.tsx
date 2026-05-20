import { Reveal } from "@/components/portfolio/motion";

type SectionHeadingProps = {
	id: string;
	eyebrow: string;
	title: string;
	description?: string;
};

export default function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
	return (
		<Reveal className="mb-12 max-w-2xl md:mb-16">
			<p
				id={`${id}-label`}
				className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/90"
			>
				{eyebrow}
			</p>
			<h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
				{title}
			</h2>
			{description ? <p className="mt-4 text-lg leading-relaxed text-zinc-400">{description}</p> : null}
		</Reveal>
	);
}
