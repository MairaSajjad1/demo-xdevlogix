/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo.onlineorder.dev-logix.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
