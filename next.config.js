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
				destination: "https://dso-database-dun.vercel.app",
			},
			{
				source: "/dracania-archives/:path*",
				destination: "https://dso-database-dun.vercel.app/:path*",
			},
		];
	},
};

module.exports = nextConfig;
