type ProjectImageProps = {
	src: string;
	alt: string;
	className?: string;
	sizes?: string;
	priority?: boolean;
};

export default function ProjectImage({ src, alt, className = "", priority }: ProjectImageProps) {
	return (
		<img
			src={src}
			alt={alt}
			loading={priority ? "eager" : "lazy"}
			decoding="async"
			className={`h-full w-full object-cover ${className}`}
		/>
	);
}
