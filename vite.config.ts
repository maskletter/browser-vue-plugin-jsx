import { defineConfig } from 'vite'
// vite-plugin-example.js

function RemoveLibPlugin() {
  return {
    name: 'inject-removelib-plugin',
    apply: 'build',
    generateBundle(options, bundle) {
      const fileSizes = {};

      for (const [fileName, output] of Object.entries<any>(bundle)) {
        if (output.type === "chunk") {
          output.code = `window.removeBabelVuePluginAssert = function(){};window.removeBabelPluginResolveType = function(){};${output.code}`
        }
      }

      console.table(fileSizes);

    }
    // renderChunk(code) {
    //   console.log(code)
    // }
  };
}


export default defineConfig({
  define: {
    "process.env": {
      BABEL_TYPES_8_BREAKING: false
    }
  },
  plugins: [
    // @ts-expect-error
    RemoveLibPlugin()
  ],
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'BabelVueJsx',
      fileName: 'index'
    },
    rollupOptions: {
      external: [
        '@babel/types',
        '@babel/template',
        '@vue/babel-plugin-resolve-type',
        "assert"

        // '@babel/helper-module-imports',
        // '@babel/helper-plugin-utils',
        // 'svg-tags',
        // 'html-tags'

      ],
      output: {
        globals: {
          '@babel/types': 'Babel.packages.types',
          '@babel/template': 'Babel.packages.template',
          // '@babel/plugin-syntax-jsx': "Babel.availablePlugins['syntax-jsx']",
          "@vue/babel-plugin-resolve-type": "removeBabelPluginResolveType",
          "assert": "removeBabelVuePluginAssert"
          // '@babel/types': 'Babel.packages.types',
        },
      },
    }
  }
})
