import "./components"
import { Counter } from "./components"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>Vite + TypeScript</h1>
<div id="counter" is="my-counter">
  <span slot="increase">+1</span>
  <span slot="decrease">-1</span>
</div>
`

const counterRef = document.querySelector<Counter>("#counter")!
counterRef.addEventListener(
  "counter-click",
  (e: any) => (counterRef.count += e.detail.value.count),
)

