"use client";

import { profile } from "@/content/profile";
import { motion, useReducedMotion } from "framer-motion";

type StatusVariant = "v4" | "craft" | "v2" | "v3";

type AvailabilityStatusProps = {
	variant?: StatusVariant;
	className?: string;
};

type ResponseTimeStatusProps = {
	variant?: StatusVariant;
	className?: string;
};

export default function AvailabilityStatus({ variant = "v4", className = "" }: AvailabilityStatusProps) {
	const reduceMotion = useReducedMotion();
	const { label, engagement, roles } = profile.availabilityStatus;
	const t = availTokens[variant];

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
			<span className={`w-px shrink-0 rounded-full ${t.accent}`} aria-hidden="true" />

			<div className="flex min-w-0 flex-col justify-center gap-1">
				<p className={`font-satoshi text-[15px] leading-snug sm:text-base ${t.line}`}>
					<span className={`font-semibold ${t.highlight}`}>{label}</span>
					<span className={t.rest}> · {engagement}</span>
				</p>
				<p className={`font-satoshi text-sm leading-relaxed ${t.roles}`}>{roles.join(", ")}</p>
			</div>
		</motion.div>
	);
}

export function ResponseTimeStatus({ variant = "v4", className = "" }: ResponseTimeStatusProps) {
	const reduceMotion = useReducedMotion();
	const { label, detail } = profile.responseTime;
	const t = rtTokens[variant];

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
			className={`flex w-full items-center gap-3.5 rounded-xl border px-5 py-4 ${t.shell} ${className}`}
			aria-label={`${label}: ${detail}`}
		>
			<ClockIcon className={`h-5 w-5 shrink-0 ${t.icon}`} />
			<div className="min-w-0">
				<p className={`font-satoshi text-[10px] font-medium uppercase tracking-wide ${t.label}`}>{label}</p>
				<p className={`mt-0.5 font-satoshi text-sm font-medium leading-snug ${t.detail}`}>{detail}</p>
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

const availTokens = {
	v4: {
		accent: "bg-brand-emerald",
		highlight: "text-brand-emerald",
		rest: "text-brand-ivory/90",
		line: "text-brand-ivory/90",
		roles: "text-brand-muted",
	},
	v3: {
		accent: "bg-brand-emerald",
		highlight: "text-brand-emerald",
		rest: "text-brand-ivory/90",
		line: "text-brand-ivory/90",
		roles: "text-brand-muted",
	},
	craft: {
		accent: "bg-emerald-400",
		highlight: "text-emerald-400",
		rest: "text-zinc-100/90",
		line: "text-zinc-100/90",
		roles: "text-zinc-500",
	},
	v2: {
		accent: "bg-v2-emerald",
		highlight: "text-v2-emerald",
		rest: "text-v2-ivory/90",
		line: "text-v2-ivory/90",
		roles: "text-v2-muted",
	},
} satisfies Record<StatusVariant, { accent: string; highlight: string; rest: string; line: string; roles: string }>;

const rtTokens = {
	v4: {
		shell: "border-brand-border bg-brand-zinc/40",
		icon: "text-brand-emerald",
		label: "text-brand-muted",
		detail: "text-brand-ivory",
	},
	v3: {
		shell: "border-brand-border bg-brand-zinc/40",
		icon: "text-brand-emerald",
		label: "text-brand-muted",
		detail: "text-brand-ivory",
	},
	craft: {
		shell: "border-zinc-800 bg-zinc-900/40",
		icon: "text-emerald-400",
		label: "text-zinc-500",
		detail: "text-zinc-100",
	},
	v2: {
		shell: "border-v2-border bg-v2-zinc/40",
		icon: "text-v2-emerald",
		label: "text-v2-muted",
		detail: "text-v2-ivory",
	},
} satisfies Record<StatusVariant, { shell: string; icon: string; label: string; detail: string }>;
