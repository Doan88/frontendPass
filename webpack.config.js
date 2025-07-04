const { withExpoWebpack } = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await withExpoWebpack(env, argv);

  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
  };

  return config;
};
