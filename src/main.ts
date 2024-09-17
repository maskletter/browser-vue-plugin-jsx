import './style.css'
import typescriptLogo from './typescript.svg'
import { transform, transformJsx } from '../lib/main'

// @ts-expect-error
const babel = window.Babel

function testJsx() {

  const c = transformJsx(`
    const name: string = "adw";
    const a = <h1>a</h1>
  `)

  console.log(c);
  
}

function testTransform() {

  const code = `
<template>
    <h1 kf="ddd">aaas</h1>
    <div> class="ad"> {{ n }}  c</div>
</template>    
<script setup lang="jsx">
const a = 'awd'
console.log(<h1>aaa</h1>)
</script>
<style scoped lang="scss">
h1,.ad {
background: red;
:deep(.ad) {
    color: v-bind(n);
}
}
</style>
`

console.log(transform(code, 'app.vue', { htmlFormat: false }))

}

testTransform();
testJsx();

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
export const getN = () => {
  
}
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
