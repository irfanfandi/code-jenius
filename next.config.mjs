/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "vignette1.wikia.nocookie.net",
        pathname: "/lotr/images/**",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
