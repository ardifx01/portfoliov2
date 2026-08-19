/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Mematikan double-render saat dev agar compile 2x lebih cepat
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 300, // Cek perubahan tiap 300ms
        aggregateTimeout: 100, // Delay compile super singkat
        ignored: ['**/node_modules/**', '**/.next/**', '**/.git/**'],
      };
    }
    return config;
  },
};

export default nextConfig;