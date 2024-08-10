/* @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	// NOTE: these configuration entries allow for static exports; see this page
	// for details:
	// https://nextjs.org/docs/app/building-your-application/deploying/static-exports
	// `distDir` allows to specify the output directory of the static deployment.
	output: "export",
	distDir: "./out",
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
// Uncommenting this makes the output folder try and be generated, but
// it fails in ways I do not currently understand:
// module.exports = nextConfig;
