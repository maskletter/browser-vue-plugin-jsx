import { defineConfig } from 'vite'
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  define: {
    "process.env": {
      BABEL_TYPES_8_BREAKING: false
    }
  },
  plugins: [
    // visualizer(
    //   {
    //     // emitFile: true,
    //     // filename: "stats.html",
    //     open: true,  // 打包后自动打开页面
    //     gzipSize: true,  // 查看 gzip 压缩大小
    //     brotliSize: true // 查看 brotli 压缩大小
    //   }
    // )

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
          "assert": "removeAssert"
          // '@babel/types': 'Babel.packages.types',
        },
      },
    }
  }
})
