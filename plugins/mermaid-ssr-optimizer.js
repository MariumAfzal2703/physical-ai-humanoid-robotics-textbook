// Alternative approach: disable SSR for pages with mermaid during build
// This plugin identifies pages with mermaid and optimizes them

module.exports = function mermaidSSROptimizer() {
  return {
    name: 'mermaid-ssr-optimizer',

    // This runs during the content loading phase
    async contentLoaded({ content, actions }) {
      // This plugin doesn't modify content but serves as documentation
      // The real optimization happens in the webpack plugin
    },

    configureWebpack(config, isServer) {
      if (!isServer || process.env.NODE_ENV !== 'production') {
        return config;
      }

      // Target only the specific mermaid-related modules that cause issues
      const originalExternals = Array.isArray(config.externals) ? [...config.externals] : [];

      // Add our specific externals for mermaid packages
      originalExternals.push(function ({ request }, callback) {
        if (!request) {
          return callback();
        }

        // Specific packages that cause memory issues during SSR
        const problematicPackages = [
          'mermaid',
          '@mermaid-js/parser',
          'langium',
          'chevrotain',
          'vscode-languageserver-types',
          'vscode-languageserver-protocol',
          'vscode-languageserver',
        ];

        if (problematicPackages.some(pkg =>
          request.startsWith(pkg) ||
          request.includes(`/${pkg}`) ||
          request.includes(`node_modules/${pkg}`)
        )) {
          return callback(null, `commonjs ${request}`);
        }

        callback();
      });

      return {
        ...config,
        externals: originalExternals,
        optimization: {
          ...config.optimization,
          // Reduce memory usage during build
          splitChunks: {
            ...config.optimization?.splitChunks,
            maxInitialRequests: 10, // Reduce initial requests to save memory
            maxAsyncRequests: 10,
          },
        },
        performance: {
          ...config.performance,
          hints: false, // Suppress performance hints to save memory
        },
      };
    },
  };
};