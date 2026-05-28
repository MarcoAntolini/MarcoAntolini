"use client";

import { profile } from "@/content/profile";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

type SiteHeaderProps = {
	pathname?: string;
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

export default function SiteHeader({ pathname = "/" }: SiteHeaderProps) {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const reduceMotion = useReducedMotion();
	const isHome = pathname === "/";

	function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
		if (!isHome) return;

		event.preventDefault();
		setMenuOpen(false);
		if (window.location.hash) {
			window.history.replaceState(null, "", "/");
		}
		scrollToTop(!reduceMotion);
	}

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
		? "border-zinc-800/80 bg-zinc-950/80 shadow-lg shadow-black/20 backdrop-blur-xl"
		: "border-transparent bg-transparent";

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
			<motion.div
				className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-300 motion-reduce:transition-none sm:px-6 ${headerClass}`}
				initial={reduceMotion ? false : { y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			>
				<a
					href="/"
					onClick={handleLogoClick}
					aria-label={isHome ? "Scroll to top" : `Back to ${profile.name}`}
					className="group font-display text-sm font-semibold tracking-tight whitespace-nowrap text-zinc-100 transition-colors duration-200 hover:text-emerald-400 motion-reduce:transition-none sm:text-base"
				>
					<span className="relative">
						{profile.name.split(" ")[0]}
						<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full motion-reduce:transition-none" />
					</span>
				</a>

				<nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
					{navItems.map((item) => {
						const isActive = isHome && activeSection === item.sectionId;

						return (
							<a
								key={item.href}
								href={item.href}
								className={`relative rounded-lg px-3 py-2 text-sm transition motion-reduce:transition-none ${
									isActive ? "text-emerald-300" : "text-zinc-400 hover:bg-zinc-800/60 hover:text-emerald-300"
								}`}
							>
								{item.label}
								{isActive ? (
									<motion.span
										layoutId="nav-active"
										className="absolute inset-x-2 -bottom-0.5 h-px bg-emerald-400"
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
						className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:text-zinc-100 motion-reduce:transition-none"
					>
						CV
					</a>
					<motion.a
						href={isHome ? "#contact" : "/#contact"}
						className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400 motion-reduce:transition-none"
						whileHover={reduceMotion ? undefined : { scale: 1.03 }}
						whileTap={reduceMotion ? undefined : { scale: 0.98 }}
					>
						Hire me
					</motion.a>
				</div>

				<button
					type="button"
					className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 md:hidden"
					aria-expanded={menuOpen}
					aria-controls="mobile-nav"
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					<span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
				</button>
			</motion.div>

			{menuOpen ? (
				<motion.nav
					id="mobile-nav"
					className="mx-auto mt-2 max-w-6xl rounded-2xl border border-zinc-800 bg-zinc-950/95 p-4 backdrop-blur-xl md:hidden"
					aria-label="Mobile"
					initial={reduceMotion ? false : { opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.25 }}
				>
					<ul className="flex flex-col gap-1">
						{navItems.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									className="block rounded-lg px-4 py-3 text-base text-zinc-300 hover:bg-zinc-800"
									onClick={() => setMenuOpen(false)}
								>
									{item.label}
								</a>
							</li>
						))}
						<li className="mt-2 border-t border-zinc-800 pt-2">
							<a
								href={isHome ? "#contact" : "/#contact"}
								className="block rounded-lg bg-emerald-500 px-4 py-3 text-center font-medium text-zinc-950"
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
