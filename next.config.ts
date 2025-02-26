import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  experimental:{
    ppr: 'incremental',
  },
  devIndicators:{
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  }
};

export default nextConfig;
