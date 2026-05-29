"use client";

import { profile } from "@/content/profile";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";

type V4HeaderProps = {
	pathname?: string;
	basePath?: string;
};

function scrollToTop(smooth: boolean) {
	window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}

const navItems = [
	{ href: "/#work", label: "Work", sectionId: "work" },
	{ href: "/#experience", label: "Experience", sectionId: "experience" },
	{ href: "/#skills", label: "Skills", sectionId: "skills" },
	{ href: "/#about", label: "About", sectionId: "about" },
	{ href: "/#contact", label: "Contact", sectionId: "contact" },
];

export default function V4Header({ pathname = "/", basePath = "" }: V4HeaderProps) {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const reduceMotion = useReducedMotion();
	const homePath = basePath || "/";
	const isHome = pathname === homePath;

	function navHref(item: (typeof navItems)[number]) {
		return `${homePath}#${item.sectionId}`;
	}

	function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
		if (!isHome) return;

		event.preventDefault();
		setMenuOpen(false);
		const base = homePath;
		if (window.location.hash) {
			window.history.replaceState(null, "", base);
		}
		scrollToTop(!reduceMotion);
	}

	const logoHref = homePath;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (!isHome) {
			setActiveSection(null);
			return;
		}

		const topResetThreshold = 80;
		const activationOffset = 160;
		let frame = 0;

		const updateActiveSection = () => {
			const scrollY = window.scrollY;
			if (scrollY < topResetThreshold) {
				setActiveSection((prev) => (prev === null ? prev : null));
				return;
			}

			let current: string | null = null;
			for (const item of navItems) {
				const section = document.getElementById(item.sectionId);
				if (!section) continue;

				const sectionTop = section.getBoundingClientRect().top + window.scrollY;
				if (scrollY + activationOffset >= sectionTop) {
					current = item.sectionId;
				}
			}

			setActiveSection((prev) => (prev === current ? prev : current));
		};

		const requestUpdate = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(() => {
				frame = 0;
				updateActiveSection();
			});
		};

		updateActiveSection();
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		window.addEventListener("hashchange", requestUpdate);
		return () => {
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
			window.removeEventListener("hashchange", requestUpdate);
			if (frame) window.cancelAnimationFrame(frame);
		};
	}, [isHome]);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	const headerClass = scrolled
		? "border-brand-border/80 bg-brand-obsidian/85 shadow-[0_16px_48px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl"
		: "border-transparent bg-transparent";

	const contactHref = isHome ? "#contact" : `${homePath}#contact`;

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
			<motion.div
				className={`mx-auto flex max-w-[1180px] items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-300 motion-reduce:transition-none sm:px-6 ${headerClass}`}
				initial={reduceMotion ? false : { y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			>
				<a
					href={logoHref}
					onClick={handleLogoClick}
					aria-label={isHome ? "Scroll to top" : `Back to ${profile.name}`}
					className="group font-satoshi text-sm font-semibold tracking-tight whitespace-nowrap text-brand-ivory transition-colors duration-200 hover:text-brand-emerald motion-reduce:transition-none sm:text-base"
				>
					<span className="relative">
						{profile.name.split(" ")[0]}
						<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-emerald transition-all duration-300 group-hover:w-full motion-reduce:transition-none" />
					</span>
				</a>

				<nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
					{navItems.map((item) => {
						const isActive = isHome && activeSection === item.sectionId;

						return (
							<a
								key={item.href}
								href={navHref(item)}
								className={`relative rounded-lg px-3 py-2 text-sm transition motion-reduce:transition-none ${
									isActive
										? "text-brand-emerald"
										: "text-brand-muted hover:bg-brand-zinc/60 hover:text-brand-emerald"
								}`}
							>
								{item.label}
								{isActive ? (
									<motion.span
										layoutId="v4-nav-active"
										className="absolute inset-x-2 -bottom-0.5 h-px bg-brand-emerald"
										transition={{ type: "spring", stiffness: 380, damping: 32 }}
									/>
								) : null}
							</a>
						);
					})}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					<a
						href={profile.cvPath}
						download
						className="rounded-lg px-3 py-2 text-sm text-brand-muted transition hover:text-brand-ivory motion-reduce:transition-none"
					>
						CV
					</a>
					<motion.a
						href={contactHref}
						className="rounded-lg bg-brand-emerald px-4 py-2 text-sm font-medium text-brand-obsidian transition hover:bg-emerald-300 motion-reduce:transition-none"
						whileHover={reduceMotion ? undefined : { scale: 1.03 }}
						whileTap={reduceMotion ? undefined : { scale: 0.98 }}
					>
						Hire me
					</motion.a>
				</div>

				<button
					type="button"
					className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-brand-border text-brand-ivory md:hidden"
					aria-expanded={menuOpen}
					aria-controls="v4-mobile-nav"
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? <CloseIcon /> : <MenuIcon />}
					<span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
				</button>
			</motion.div>

			{menuOpen ? (
				<motion.nav
					id="v4-mobile-nav"
					className="mx-auto mt-2 max-w-[1180px] rounded-2xl border border-brand-border bg-brand-obsidian/95 p-4 backdrop-blur-xl md:hidden"
					aria-label="Mobile"
					initial={reduceMotion ? false : { opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.25 }}
				>
					<ul className="flex flex-col gap-1">
						{navItems.map((item) => (
							<li key={item.href}>
								<a
									href={navHref(item)}
									className="block rounded-lg px-4 py-3 text-base text-brand-muted hover:bg-brand-zinc hover:text-brand-ivory"
									onClick={() => setMenuOpen(false)}
								>
									{item.label}
								</a>
							</li>
						))}
						<li className="mt-2 border-t border-brand-border pt-2">
							<a
								href={contactHref}
								className="block rounded-lg bg-brand-emerald px-4 py-3 text-center font-medium text-brand-obsidian"
								onClick={() => setMenuOpen(false)}
							>
								Get in touch
							</a>
						</li>
					</ul>
				</motion.nav>
			) : null}
		</header>
	);
}

function MenuIcon() {
	return (
		<svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
			<path d="M4 6h12M4 10h12M4 14h12" strokeLinecap="round" />
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
			<path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
		</svg>
	);
}
