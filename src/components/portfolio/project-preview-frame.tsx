import ProjectImage from "@/components/portfolio/project-image";

type ProjectPreviewFrameProps = {
	src: string;
	alt: string;
	domain?: string;
	priority?: boolean;
};

export default function ProjectPreviewFrame({ src, alt, domain = "dracania-archives.com", priority }: ProjectPreviewFrameProps) {
	return (
		<div className="relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/80 shadow-2xl shadow-black/40">
			<div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950/90 px-4 py-3">
				<span className="h-2.5 w-2.5 rounded-full bg-zinc-600" aria-hidden />
				<span className="h-2.5 w-2.5 rounded-full bg-zinc-600" aria-hidden />
				<span className="h-2.5 w-2.5 rounded-full bg-zinc-600" aria-hidden />
				<span className="ml-2 flex-1 truncate rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-[11px] text-zinc-500">
					{domain}
				</span>
			</div>
			<div className="relative aspect-[16/10] bg-gradient-to-br from-emerald-950/40 via-zinc-950 to-zinc-950">
				<ProjectImage
					src={src}
					alt={alt}
					priority={priority}
					className="object-cover object-center"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-transparent"
					aria-hidden
				/>
			</div>
		</div>
	);
}
