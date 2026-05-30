import { getProfile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import type { CSSProperties } from "react";

type RevealStyle = CSSProperties & Record<"--reveal-delay", string>;

type AvailabilityStatusProps = {
	className?: string;
	locale?: Locale;
};

type ResponseTimeStatusProps = {
	className?: string;
	locale?: Locale;
};

export default function AvailabilityStatus({ className = "", locale = "en" }: AvailabilityStatusProps) {
	const profile = getProfile(locale);
	const { label, engagement, roles } = profile.availabilityStatus;

	return (
		<div
			className={`site-reveal flex max-w-lg items-stretch gap-3.5 ${className}`}
			style={{ "--reveal-delay": "0.04s" } as RevealStyle}
			aria-label={profile.availability}
		>
			<span className="w-px shrink-0 rounded-full bg-brand-emerald" aria-hidden="true" />

			<div className="flex min-w-0 flex-col justify-center gap-1">
				<p className="font-satoshi text-[15px] leading-snug text-brand-ivory/90 sm:text-base">
					<span className="font-semibold text-brand-emerald">{label}</span>
					<span className="text-brand-ivory/90"> · {engagement}</span>
				</p>
				<p className="font-satoshi text-sm leading-relaxed text-brand-muted">{roles.join(", ")}</p>
			</div>
		</div>
	);
}

export function ResponseTimeStatus({ className = "", locale = "en" }: ResponseTimeStatusProps) {
	const profile = getProfile(locale);
	const { label, detail } = profile.responseTime;

	return (
		<div
			className={`site-reveal flex w-full items-center gap-3.5 rounded-xl border border-brand-border bg-brand-zinc/40 px-5 py-4 ${className}`}
			style={{ "--reveal-delay": "0.06s" } as RevealStyle}
			aria-label={`${label}: ${detail}`}
		>
			<ClockIcon className="h-5 w-5 shrink-0 text-brand-emerald" />
			<div className="min-w-0">
				<p className="font-satoshi text-[10px] font-medium uppercase tracking-wide text-brand-muted">{label}</p>
				<p className="mt-0.5 font-satoshi text-sm font-medium leading-snug text-brand-ivory">{detail}</p>
			</div>
		</div>
	);
}

function ClockIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
			<circle cx="10" cy="10" r="7.25" />
			<path d="M10 6v4.25l2.75 1.75" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
