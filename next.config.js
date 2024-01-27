/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.shopify.com",
				pathname: "/s/files/**",
			},
			{
				protocol: "https",
				hostname: "lumia-theme.com",
				pathname: "/cdn/**",
			},
			{
				protocol: "https",
				hostname: "www.gravatar.com",
				pathname: "/avatar/**",
			},
		],
	},
	staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
