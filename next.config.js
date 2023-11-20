/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: false,
    };
    return config;
  },
};

module.exports = nextConfig;
