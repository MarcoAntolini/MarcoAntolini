import { profile } from "@/content/profile";

type ContactLinksProps = {
	className?: string;
	linkClassName?: string;
};

export function ContactLinks({ className = "", linkClassName = "underline hover:opacity-80" }: ContactLinksProps) {
	return (
		<div className={`flex flex-wrap items-center gap-3 ${className}`}>
			<a href={profile.cvPath} download className={linkClassName}>
				Download CV
			</a>
			<a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClassName}>
				LinkedIn
			</a>
			<a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClassName}>
				GitHub
			</a>
			<a href={`mailto:${profile.email}`} className={linkClassName}>
				{profile.email}
			</a>
		</div>
	);
}

export function GitHubAvatar({ className = "h-16 w-16 rounded-2xl" }: { className?: string }) {
	return (
		<img
			src={`https://github.com/${profile.githubUsername}.png`}
			alt=""
			className={className}
		/>
	);
}
