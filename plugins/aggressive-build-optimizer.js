// Docusaurus plugin to aggressively optimize memory during build
// This plugin modifies how heavy modules are handled during SSR

module.exports = function aggressiveBuildOptimizer() {
  return {
    name: 'aggressive-build-optimizer',

    configureWebpack(config, isServer) {
      if (!isServer || process.env.NODE_ENV !== 'production') {
        return {};
      }

      // More aggressive externals for server build
      const externals = config.externals || [];

      // Add function-based external resolver
      externals.push(function ({ context, request }, callback) {
        if (!request) {
          return callback();
        }

        // Patterns for heavy packages that should not be processed during SSR
        const heavyPatterns = [
          /mermaid/,
          /vscode-languageserver/,
          /langium/,
          /@mermaid-js\/parser/,
          /chevrotain/,
          /cytoscape/,
          /d3-/,
          /plotly/,
          /three/,
          /babylon/,
          /framer-motion/,
          /gsap/,
          /@emotion/,  // CSS-in-JS
          /@mui/,       // Material UI
          /react-syntax-highlighter/,
        ];

        if (heavyPatterns.some(pattern => pattern.test(request))) {
          return callback(null, `commonjs ${request}`);
        }

        callback();
      });

      return {
        ...config,
        externals,
        // Reduce memory usage during build
        optimization: {
          ...config.optimization,
          splitChunks: false, // Disable chunk splitting to save memory during build
        },
        // Disable expensive features during build
        performance: {
          hints: false,
          maxAssetSize: 512000,
          maxEntrypointSize: 512000,
        },
      };
    },

    // Pre-load hook to set up memory management
    async contentLoaded({ actions }) {
      // This runs after content is loaded but before SSR
      if (typeof process.env.NODE_ENV === 'production') {
        // Increase GC frequency during build
        if (global.gc) {
          global.gc();
        }
      }
    },
  };
};