import "./components"
import { Counter, CounterClickEvent } from "./components"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>Vite + TypeScript</h1>
<div id="counter" is="my-counter">
  <span slot="increase">+1</span>
  <span slot="decrease">-1</span>
</div>
`

const counterRef = document.querySelector<Counter>("#counter")!
counterRef.addEventListener("counter-click", (e: CustomEvent<{ value: CounterClickEvent }>) => {
  counterRef.count += e.detail.value.count
})

console.log(counterRef.count);


setTimeout(() => {
  counterRef.history.push(64)
}, 3000);


setTimeout(() => {
  counterRef.history[1]++
}, 5001);
