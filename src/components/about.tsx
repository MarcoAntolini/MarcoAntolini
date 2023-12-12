"use client";

import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";

export default function About() {
	const { ref } = useSectionInView("About");

	return (
		<motion.section
			ref={ref}
			className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.175 }}
			id="about"
		>
			<SectionHeading>About me</SectionHeading>
			<p className="mb-3">
				I am a student at <span className="font-medium">UNIBO, Cesena</span> and currently studying{" "}
				<span className="font-medium">Computer Science and Engineering</span>. My main interests are{" "}
				<span className="font-medium">web development</span> and{" "}
				<span className="font-medium">software engineering</span>. My goal is to become a{" "}
				<span className="font-medium">full-stack web developer</span>.
			</p>

			<p>
				<span className="italic">When I&apos;m not coding</span>, I enjoy playing video games, watching movies,
				listening to music (literally any kind) and going to the gym.
			</p>
		</motion.section>
	);
}
