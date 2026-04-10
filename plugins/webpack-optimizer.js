// Docusaurus plugin: optimize webpack build to reduce memory usage
module.exports = function webpackOptimizerPlugin() {
  return {
    name: 'webpack-optimizer-plugin',
    configureWebpack(_config, isServer) {
      if (process.env.NODE_ENV !== 'production') return {};

      const config = {
        devtool: false, // Disable source maps → saves ~500MB RAM
        performance: {
          hints: false,
        },
      };

      // During SSR (server build), exclude heavy mermaid/langium/vscode packages
      // from the server bundle. They are client-only and don't need to run in SSR.
      if (isServer) {
        config.externals = [
          function ({ request }, callback) {
            const heavyModules = [
              'mermaid',
              'langium',
              'vscode-languageserver',
              'vscode-languageserver-types',
              'vscode-languageserver-protocol',
              'vscode-languageserver-textdocument',
              '@mermaid-js/parser',
              'chevrotain',
            ];
            if (heavyModules.some(mod => request && request.includes(mod))) {
              return callback(null, `commonjs ${request}`);
            }
            callback();
          },
        ];
      }

      return config;
    },
  };
};
