import './style.css'
import typescriptLogo from './typescript.svg'
import { plugin } from '../lib/main'

// @ts-expect-error
const babel = window.Babel


const code = `
    import Vue from 'vue'
    import React from 'react'
    import Vue3, { ref } from 'vue'
    import * as Vue2 from 'vue'
    import './c.css'
    class Sc {
        load!: string;
    }
    export const name = (a: string) => {
        return Vue;
    }
    export const a2 = a?.f?.c
    const He = () => {
        const v = ref(1)
        return <div v-model={v}>aa</div>
    }
`


console.log(babel.transform(code, {
  plugins: [
    plugin(),
  ],
  presets: ['typescript', ["env", {
      modules: false,
      "targets": "> 10%, not dead",
  }]], 
  filename: 'index.tsx',
}).code);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
