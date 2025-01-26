import { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/storage/v1/**",
        search: "",
      },
    ],
  },
};

export default config;
