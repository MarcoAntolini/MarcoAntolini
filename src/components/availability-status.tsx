"use client";

import { profile } from "@/content/profile";
import { motion, useReducedMotion } from "framer-motion";

type AvailabilityStatusProps = {
	className?: string;
};

type ResponseTimeStatusProps = {
	className?: string;
};

export default function AvailabilityStatus({ className = "" }: AvailabilityStatusProps) {
	const reduceMotion = useReducedMotion();
	const { label, engagement, roles } = profile.availabilityStatus;

	const motionProps = !reduceMotion
		? {
				initial: { opacity: 0, y: 8 },
				animate: { opacity: 1, y: 0 },
				transition: { duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] as const },
			}
		: {};

	return (
		<motion.div
			{...motionProps}
			className={`flex max-w-lg items-stretch gap-3.5 ${className}`}
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
		</motion.div>
	);
}

export function ResponseTimeStatus({ className = "" }: ResponseTimeStatusProps) {
	const reduceMotion = useReducedMotion();
	const { label, detail } = profile.responseTime;

	const motionProps = !reduceMotion
		? {
				initial: { opacity: 0, y: 10 },
				animate: { opacity: 1, y: 0 },
				transition: { duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] as const },
			}
		: {};

	return (
		<motion.div
			{...motionProps}
			className={`flex w-full items-center gap-3.5 rounded-xl border border-brand-border bg-brand-zinc/40 px-5 py-4 ${className}`}
			aria-label={`${label}: ${detail}`}
		>
			<ClockIcon className="h-5 w-5 shrink-0 text-brand-emerald" />
			<div className="min-w-0">
				<p className="font-satoshi text-[10px] font-medium uppercase tracking-wide text-brand-muted">{label}</p>
				<p className="mt-0.5 font-satoshi text-sm font-medium leading-snug text-brand-ivory">{detail}</p>
			</div>
		</motion.div>
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
