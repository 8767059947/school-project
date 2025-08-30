/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // This one is from our seed data
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fchss.edu.in', // Add this new entry
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;