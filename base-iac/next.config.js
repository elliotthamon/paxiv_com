/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "lft.oasyx.org",
      },
      {
        protocol: "https",
        hostname: "*.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "api.chatkitty.com",
      },
    ],
  },
};

module.exports = nextConfig;
