const webpack = require('webpack');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Ensure fallback exists
  if (!config.resolve.fallback) {
    config.resolve.fallback = {};
  }

  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    process: require.resolve('process/browser'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'), // <-- Add buffer if needed
    vm: false,
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'], // <-- Provide Buffer globally
    }),
  ];

  return config;
};
