import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  // },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
