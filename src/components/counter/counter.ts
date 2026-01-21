import { defineElement, event, property, ref } from "../../lib"
import htmlStr from "./counter.html?raw"
import cssStr from "./counter.scss?inline"

@defineElement({
  tagName: "my-counter",
  html: htmlStr,
  css: cssStr,
  options: { extends: 'div' }
})
export class Counter extends HTMLDivElement {
  @property()
  accessor zName = "zero"

  @property()
  accessor count = 0

  @property()
  accessor isGood = true

  @ref(".counter")
  counterRef!: HTMLDivElement

  @ref(".increase")
  increaseRef!: HTMLButtonElement

  @ref(".decrease")
  decreaseRef!: HTMLButtonElement

  @event({
    name: "counter-click",
  })
  counterClick!: CustomEvent<any>

  constructor() {
    super()
  }

  connected() {
    this.increaseRef.addEventListener("click", this.incHandler)
    this.decreaseRef.addEventListener("click", this.decHandler)
  }

  disconnected() {
    this.increaseRef.removeEventListener("click", this.incHandler)
    this.decreaseRef.removeEventListener("click", this.decHandler)
  }

  incHandler = (e: MouseEvent) => {
    (this as any)?.emitCounterClick({ e, count: 1 })
  }

  decHandler = (e: MouseEvent) => {
    (this as any)?.emitCounterClick({ e, count: -1 })
  }

  countUpdate(_oldCount: number, newCount: number) {
    this.counterRef.innerHTML = newCount.toString()
  }

  // attributyyeChanged(attributeName: string, oldValue: string, newValue: string) {
  //   console.log(attributeName, oldValue, newValue);
  // }
}

