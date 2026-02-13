import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", //* er mani holo ja kunu extarnal link accept korbe
      }],
  },
};

export default nextConfig;
