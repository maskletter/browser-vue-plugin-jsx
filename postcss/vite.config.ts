import { defineConfig } from 'vite'
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      include: 'lib'
    })
  ],
  define: {
    "process.platform": "''",
    "process.env": {
      BABEL_TYPES_8_BREAKING: false
    }
  },
  build: {
    lib: {
      entry: ['./lib/index.ts', './lib/cssModule.ts'],
      // name: 'CodeWebPostcss',
      // fileName: 'index',
      formats: ['es',]
    }
  }
})
