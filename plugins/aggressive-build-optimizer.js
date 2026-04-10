// Docusaurus plugin to optimize memory during build
// This plugin modifies how heavy modules are handled during SSR

module.exports = function buildOptimizer() {
  return {
    name: 'build-optimizer',

    configureWebpack(config, isServer) {
      if (!isServer || process.env.NODE_ENV !== 'production') {
        return {};
      }

      // Selective externals for server build - only exclude specific heavy packages
      const externals = config.externals || [];

      // Add function-based external resolver
      externals.push(function ({ context, request }, callback) {
        if (!request) {
          return callback();
        }

        // Only exclude specific mermaid-related packages that cause memory issues
        // Avoid catching CSS loaders, Babel, or other essential build tools
        const heavyMermaidPackages = [
          'mermaid',
          'vscode-languageserver',
          'vscode-languageserver-types',
          'vscode-languageserver-protocol',
          'vscode-languageserver-textdocument',
          'langium',
          '@mermaid-js/parser',
          'chevrotain',
        ];

        if (heavyMermaidPackages.some(pkg => request.includes(pkg))) {
          return callback(null, `commonjs ${request}`);
        }

        callback();
      });

      return {
        ...config,
        externals,
        // Reduce memory usage during build by disabling chunk splitting
        optimization: {
          ...config.optimization,
          splitChunks: {
            chunks: 'async', // Only split async chunks, not all chunks
          },
        },
        // Reduce memory pressure
        performance: {
          hints: false,
        },
      };
    },
  };
};