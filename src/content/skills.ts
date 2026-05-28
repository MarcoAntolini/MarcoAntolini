export type SkillGroup = {
	name: string;
	skills: string[];
};

export const skillGroups: SkillGroup[] = [
	{
		name: "Frontend & mobile",
		skills: ["React", "Next.js", "Astro", "TypeScript", "Tailwind CSS", "Flutter", "Dart", "HTML", "CSS"],
	},
	{
		name: "Backend & data",
		skills: ["Node.js", "Express", "Prisma", "Python", "Flask", "Django", "PHP", "MySQL", "MongoDB"],
	},
	{
		name: "Tools & platforms",
		skills: ["Git", "Chrome extensions", "VS Code extensions", "Vercel", "REST APIs", "Arduino", "IoT"],
	},
	{
		name: "Languages",
		skills: ["TypeScript", "JavaScript", "Java", "Python", "C#", "C/C++", "Kotlin"],
	},
];
