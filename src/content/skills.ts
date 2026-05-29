import { defaultLocale, type Locale } from "@/lib/i18n";

export type SkillGroup = {
	name: string;
	skills: string[];
};

export const skillGroupsByLocale = {
	en: [
		{
			name: "Frontend & mobile",
			skills: ["React", "Next.js", "Astro", "TypeScript", "Tailwind CSS", "shadcn/ui", "HTML", "CSS"],
		},
		{
			name: "Backend & data",
			skills: ["Node.js", "Express", "Prisma", "Python", "Flask", "Django", "PHP", "MySQL", "Firebase", "Stripe", "Convex"],
		},
		{
			name: "Tools & platforms",
			skills: ["Git", "Chrome extensions", "VS Code extensions", "Vercel", "REST APIs", "Arduino", "IoT"],
		},
		{
			name: "Languages",
			skills: ["TypeScript", "JavaScript", "Java", "Python", "C#", "C/C++", "Kotlin", "Swift", "Lua"],
		},
	],
	it: [
		{
			name: "Frontend e mobile",
			skills: ["React", "Next.js", "Astro", "TypeScript", "Tailwind CSS", "shadcn/ui", "HTML", "CSS"],
		},
		{
			name: "Backend e dati",
			skills: ["Node.js", "Express", "Prisma", "Python", "Flask", "Django", "PHP", "MySQL", "Firebase", "Stripe", "Convex"],
		},
		{
			name: "Tool e piattaforme",
			skills: ["Git", "Estensioni Chrome", "Estensioni VS Code", "Vercel", "REST APIs", "Arduino", "IoT"],
		},
		{
			name: "Linguaggi",
			skills: ["TypeScript", "JavaScript", "Java", "Python", "C#", "C/C++", "Kotlin", "Swift", "Lua"],
		},
	],
} satisfies Record<Locale, SkillGroup[]>;

export const skillGroups = skillGroupsByLocale[defaultLocale];

export function getSkillGroups(locale: Locale = defaultLocale) {
	return skillGroupsByLocale[locale];
}
