/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/next-app-template",
				destination: "https://next-app-template-phi.vercel.app",
			},
			{
				source: "/next-app-template/:path*",
				destination: "https://next-app-template-phi.vercel.app/:path*",
			},
			{
				source: "/dracania-archives",
				destination: "https://dracania-archives.com",
			},
			{
				source: "/dracania-archives/:path*",
				destination: "https://dracania-archives.com/:path*",
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "github.com",
			},
		],
	},
};

module.exports = nextConfig;
