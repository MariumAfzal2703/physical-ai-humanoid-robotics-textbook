// Docusaurus plugin: disable source maps in production to reduce build memory usage
module.exports = function webpackOptimizerPlugin() {
  return {
    name: 'webpack-optimizer-plugin',
    configureWebpack(_config, isServer) {
      if (process.env.NODE_ENV !== 'production') return {};
      return {
        devtool: false, // Disable source maps → saves ~500MB RAM
        performance: {
          hints: false, // Suppress size warnings
        },
      };
    },
  };
};
