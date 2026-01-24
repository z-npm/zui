import { defineElement, event, property, ref, EventEmitter, Zui } from "../../lib"
import htmlStr from "./counter.html?raw"
import cssStr from "./counter.scss?inline"


export type CounterClickEvent = { count: number; e?: MouseEvent }

@defineElement({
  tagName: "my-counter",
  html: htmlStr,
  css: cssStr,
  options: { extends: 'div' }
})
export class Counter extends Zui(HTMLDivElement) {
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

  @event()
  counterClick!: EventEmitter<CounterClickEvent>

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
    this.counterClick.emit({ e, count: 1 })
  }

  decHandler = (e: MouseEvent) => {
    this.counterClick.emit({ e, count: -1 })
  }

  countUpdate(_oldCount: number, newCount: number) {
    this.counterRef.innerHTML = newCount.toString()
  }

  // attributyyeChanged(attributeName: string, oldValue: string, newValue: string) {
  //   console.log(attributeName, oldValue, newValue);
  // }
}

