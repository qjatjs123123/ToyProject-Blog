import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Strict Mode 비활성화
  logging: {
    fetches: {
      fullUrl: true,
    }
  },

  images: {
    domains: ["s3-ap-northeast-2.amazonaws.com"], // 외부 도메인 허용
  },
};

export default nextConfig;
