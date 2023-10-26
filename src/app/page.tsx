"use client";

import React, { useEffect, useState } from "react";
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-32 gap-16">
			<h1 className="font-extrabold text-5xl">Marco Antolini personal website</h1>
			<ProgressBar />
			<h2 className="text-2xl">⚠️ Currently work in progress... ⚠️</h2>
		</main>
	);
}

const ProgressBar: React.FC = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prevProgress) => (prevProgress + 1) % 101);
		}, 500);

		return () => clearInterval(interval);
	}, []);

	const containerStyle = {
		width: "50%",
		minWidth: "200px",
		height: "20px",
		backgroundColor: "#f3f3f3",
		borderRadius: "5px",
		marginTop: "10px",
	};

	const progressBarStyle = {
		width: `${progress}%`,
		height: "100%",
		backgroundColor: "#3498db",
		borderRadius: "5px",
		transition: "width 0.6s ease-in-out",
	};

	return (
		<div style={containerStyle} className="progress-bar">
			<div style={progressBarStyle} className="progress-fill"></div>
		</div>
	);
};
