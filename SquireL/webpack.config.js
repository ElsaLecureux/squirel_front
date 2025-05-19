const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Enable history API fallback
  config.devServer.historyApiFallback = true;

  return config;
};
