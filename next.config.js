/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: false,
    };
    return config;
  },
};

module.exports = nextConfig;
