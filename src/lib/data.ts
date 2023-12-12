import dracaniaArchivesImg from "@/public/dracania-archives.png";
import flyawayImg from "@/public/flyaway.png";
import React from "react";
import { BsCalendar3 } from "react-icons/bs";
import { FaUniversity } from "react-icons/fa";

export const links = [
	{
		name: "Home",
		hash: "#home",
	},
	{
		name: "About",
		hash: "#about",
	},
	{
		name: "Projects",
		hash: "#projects",
	},
	{
		name: "Skills",
		hash: "#skills",
	},
	{
		name: "Experience",
		hash: "#experience",
	},
	{
		name: "Contact",
		hash: "#contact",
	},
] as const;

export const experiencesData = [
	{
		title: "University of Bologna",
		location: "Cesena, Italy",
		description: "Currently studying Computer Science and Engineering.",
		icon: React.createElement(FaUniversity),
		date: "2021 - present",
	},
	{
		title: "Internship",
		location: "TBD",
		description:
			"University internship. I'm looking for an internship in the software development field, possibly in a startup company that uses modern technologies.",
		icon: React.createElement(BsCalendar3),
		date: "2024",
	},
] as const;

export const projectsData = [
	{
		title: "Fly Away",
		description: "A simple website for a fictional travel agency built with Python and Flask.",
		tags: ["Python", "Flask", "SQL"],
		imageUrl: flyawayImg,
	},
	{
		title: "Dracania Archives",
		description:
			"A web app for the online game Drakensang Online that consists of a database of items in the game with few more tools.",
		tags: ["React", "Next.js", "Tailwind"],
		imageUrl: dracaniaArchivesImg,
	},
] as const;

export const skillsData = [
	"HTML",
	"CSS",
	"JavaScript",
	"TypeScript",
	"React",
	"Next.js",
	"Node.js",
	"Git",
	"Tailwind",
	"Prisma",
	"MongoDB",
	"Express",
	"Python",
	"Django",
	"Java",
	"MySQL",
	"C#",
	"C/C++",
	"PHP",
	"Dart",
	"Flutter",
	"Kotlin",
	"Arduino",
	"Assembler",
] as const;
