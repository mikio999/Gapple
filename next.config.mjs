/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['phinf.pstatic.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gapple-files.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
