type ProjectIconProps = {
	src: string;
	alt: string;
	size?: "sm" | "md" | "lg";
	className?: string;
};

const sizeClasses = {
	sm: "h-10 w-10 rounded-lg",
	md: "h-14 w-14 rounded-xl",
	lg: "h-20 w-20 rounded-2xl",
};

export default function ProjectIcon({ src, alt, size = "md", className = "" }: ProjectIconProps) {
	const isSquareIcon = src.includes("/projects/icons/");

	return (
		<div
			className={`overflow-hidden border border-zinc-700/80 bg-zinc-900 shadow-lg shadow-black/20 ${sizeClasses[size]} ${className}`}
		>
			<img
				src={src}
				alt={alt}
				loading="lazy"
				decoding="async"
				className={`h-full w-full ${isSquareIcon ? "object-contain p-1.5" : "object-cover"}`}
			/>
		</div>
	);
}
