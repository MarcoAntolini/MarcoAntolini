"use client";

import { getProfile } from "@/content/profile";
import { getSiteCopy } from "@/content/site-copy";
import { alternateLocale, localizedPath, locales, stripLocalePrefix, type Locale } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";

type HeaderProps = {
	pathname?: string;
	locale?: Locale;
};

function scrollToTop(smooth: boolean) {
	window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}

export default function Header({ pathname = "/", locale = "en" }: HeaderProps) {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const reduceMotion = useReducedMotion();
	const copy = getSiteCopy(locale);
	const profile = getProfile(locale);
	const navItems = copy.header.nav;
	const basePathname = stripLocalePrefix(pathname);
	const isHome = basePathname === "/";

	function navHref(item: (typeof navItems)[number]) {
		return localizedPath(item.href, locale);
	}

	function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
		if (!isHome) return;

		event.preventDefault();
		setMenuOpen(false);
		const homePath = localizedPath("/", locale);
		if (window.location.hash) {
			window.history.replaceState(null, "", homePath);
		}
		scrollToTop(!reduceMotion);
	}

	const logoHref = localizedPath("/", locale);

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
		const bottomThreshold = 48;
		let frame = 0;

		const updateActiveSection = () => {
			const scrollY = window.scrollY;
			if (scrollY < topResetThreshold) {
				setActiveSection((prev) => (prev === null ? prev : null));
				return;
			}

			const atPageBottom =
				window.innerHeight + scrollY >= document.documentElement.scrollHeight - bottomThreshold;

			let current: string | null = null;

			if (atPageBottom) {
				current = navItems[navItems.length - 1]?.sectionId ?? null;
			} else {
				for (const item of navItems) {
					const section = document.getElementById(item.sectionId);
					if (!section) continue;

					const sectionTop = section.getBoundingClientRect().top + scrollY;
					if (scrollY + activationOffset >= sectionTop) {
						current = item.sectionId;
					}
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

	const contactHref = localizedPath("/#contact", locale);
	const alternateHref = localizedPath(basePathname, alternateLocale(locale));

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
					aria-label={isHome ? copy.header.logoHomeLabel : `${copy.header.logoBackLabel} ${profile.name}`}
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
										layoutId="site-nav-active"
										className="absolute inset-x-2 -bottom-0.5 h-px bg-brand-emerald"
										transition={{ type: "spring", stiffness: 380, damping: 32 }}
									/>
								) : null}
							</a>
						);
					})}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					<LanguageSwitch locale={locale} pathname={basePathname} label={copy.header.languageLabel} names={copy.header.languageNames} />
					<a
						href={contactHref}
						className="rounded-lg bg-brand-emerald px-4 py-2 text-sm font-medium text-brand-obsidian transition-colors duration-200 hover:bg-brand-emerald/85 motion-reduce:transition-none"
					>
						{copy.header.contactCta}
					</a>
				</div>

				<button
					type="button"
					className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-brand-border text-brand-ivory md:hidden"
					aria-expanded={menuOpen}
					aria-controls="site-mobile-nav"
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? <CloseIcon /> : <MenuIcon />}
					<span className="sr-only">{menuOpen ? copy.header.closeMenu : copy.header.openMenu}</span>
				</button>
			</motion.div>

			{menuOpen ? (
				<motion.nav
					id="site-mobile-nav"
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
						<li className="mt-2 border-t border-brand-border pt-3">
							<div className="flex items-center justify-between gap-3 px-4 py-2">
								<span className="font-space-mono text-[11px] uppercase tracking-[0.14em] text-brand-muted">
									{copy.header.languageLabel}
								</span>
								<a
									href={alternateHref}
									className="rounded-full border border-brand-border px-3 py-1.5 font-space-mono text-[11px] uppercase tracking-[0.14em] text-brand-ivory transition hover:border-brand-emerald/50 hover:text-brand-emerald"
									onClick={() => setMenuOpen(false)}
								>
									{alternateLocale(locale).toUpperCase()}
								</a>
							</div>
						</li>
						<li className="mt-2 border-t border-brand-border pt-2">
							<a
								href={contactHref}
								className="block rounded-lg bg-brand-emerald px-4 py-3 text-center font-medium text-brand-obsidian"
								onClick={() => setMenuOpen(false)}
							>
								{copy.header.mobileCta}
							</a>
						</li>
					</ul>
				</motion.nav>
			) : null}
		</header>
	);
}

function LanguageSwitch({
	locale,
	pathname,
	label,
	names,
}: {
	locale: Locale;
	pathname: string;
	label: string;
	names: Record<Locale, string>;
}) {
	return (
		<div className="flex rounded-lg border border-brand-border bg-brand-zinc/45 p-1" role="group" aria-label={label}>
			{locales.map((option) => {
				const isActive = option === locale;

				return (
					<a
						key={option}
						href={localizedPath(pathname, option)}
						aria-current={isActive ? "true" : undefined}
						aria-label={names[option]}
						className={`rounded-md px-2.5 py-1.5 font-space-mono text-[11px] uppercase tracking-[0.14em] transition motion-reduce:transition-none ${
							isActive ? "bg-brand-emerald text-brand-obsidian" : "text-brand-muted hover:bg-brand-zinc/70 hover:text-brand-ivory"
						}`}
					>
						{option}
					</a>
				);
			})}
		</div>
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
