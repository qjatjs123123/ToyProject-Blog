import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Strict Mode 비활성화
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    // 기존 허용 도메인 + 추가
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // ✅ 이 도메인 추가
      },
    ],
  },
};

export default nextConfig;
