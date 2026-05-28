import ProjectImage from "@/components/portfolio/project-image";

type ProjectPreviewFrameProps = {
	src: string;
	alt: string;
	previewGradient?: string;
	priority?: boolean;
};

export default function ProjectPreviewFrame({
	src,
	alt,
	previewGradient = "from-emerald-950/40 via-zinc-950 to-zinc-950",
	priority,
}: ProjectPreviewFrameProps) {
	return (
		<div className="relative overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-900/80 shadow-2xl shadow-black/40">
			<div className={`relative aspect-[16/10] bg-gradient-to-br ${previewGradient}`}>
				<ProjectImage
					src={src}
					alt={alt}
					priority={priority}
					className="object-cover object-center"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/35 via-transparent to-zinc-950/10"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
					aria-hidden
				/>
			</div>
		</div>
	);
}
