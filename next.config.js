/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactRefresh: false,
    fastRefresh: false,
    turboMode: true, // Enable Turbopack
    // missingSuspenseWithCSRBailout: false,
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint warnings during build
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mypcp.us",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
