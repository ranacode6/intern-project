/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        // port: '8000',
      },
      {
        protocol: 'https',
        hostname: 'intern-project-3uzm.onrender.com',
        // port: '8000',
      },
    ],
  },
};

export default nextConfig;
