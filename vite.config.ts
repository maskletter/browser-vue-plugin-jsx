import { defineConfig } from 'vite'
import { visualizer } from "rollup-plugin-visualizer";
import dts from "vite-plugin-dts";
// vite-plugin-example.js

function RemoveLibPlugin() {
  return {
    name: 'inject-removelib-plugin',
    apply: 'build' as 'build',
    generateBundle(options, bundle) {
      for (const [fileName, output] of Object.entries<any>(bundle)) {
        if (output.type === "chunk") {
          output.code = `window.removeBabelVuePluginAssert = function(){};window.removeBabelPluginResolveType = function(){};${output.code}`
        }
      }

    }
  };
}

export default defineConfig(config => {
  
  return {
    define: {
      "process.env": {
        BABEL_TYPES_8_BREAKING: false
      }
    },
    plugins: [
      RemoveLibPlugin(),
      dts({
        include: 'lib'
      }),

      config.mode === 'size' ? visualizer(
        {
          // emitFile: true,
          // filename: "stats.html",
          open: true,  // 打包后自动打开页面
          gzipSize: true,  // 查看 gzip 压缩大小
          brotliSize: true // 查看 brotli 压缩大小
        }
      ) : undefined

    ],
    build: {
      lib: {
        entry: './lib/main.ts',
        name: 'BabelVueJsx',
        fileName: 'main'
      },
      rollupOptions: {
        external: [
          // 'entities',
          // 'estree-walker',
          // '@babel/parser',
          // '@vue/shared',
          // 'source-map-js',
          // "source-map-js",
          // "@vue/compiler-dom",
          // "postcss",
          // "@vue/compiler-core",
          // '@vue/babel-plugin-jsx',
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
          },
        },
      }
    }
  }
})
