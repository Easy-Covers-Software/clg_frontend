/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // config.experiments = {
      // ...config.experiments,
    //   topLevelAwait: true,
    // };

    config.resolve = {
      ...config.resolve,
      preferRelative: true,
    };

    return config;
  },
};

module.exports = nextConfig;
