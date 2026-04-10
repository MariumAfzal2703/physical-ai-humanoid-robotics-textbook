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

      // During SSR (server build), exclude heavy client-side packages
      // from the server bundle. They are client-only and don't need to run in SSR.
      if (isServer) {
        config.externals = [
          function ({ request }, callback) {
            if (!request) {
              callback();
              return;
            }

            const heavyModules = [
              'mermaid',           // 76MB - main mermaid library
              'langium',           // 5.6MB - language server framework
              'vscode-languageserver',           // Language server protocol
              'vscode-languageserver-types',     // VSCode language server types
              'vscode-languageserver-protocol',  // Language server protocol
              'vscode-languageserver-textdocument', // Text document management
              '@mermaid-js/parser',              // Mermaid parser
              'chevrotain',                      // Parser library (4.4MB)
              '@cytoscape',                      // Graph visualization
              'cytoscape',                       // Graph library
              'd3-',                             // Data visualization
              'plotly',                          // Charting library
              'three',                           // 3D library
              'babylonjs',                       // 3D engine
              'framer-motion',                   // Animation library
              'gsap',                            // Animation library
            ];

            if (heavyModules.some(mod => request.includes(mod))) {
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
