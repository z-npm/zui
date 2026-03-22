import { defineElement, ref, Zui } from "../../lib"
import htmlStr from "./index.html?raw"
import cssStr from "./index.scss?inline"
import { ElementType, FormElementFactory } from "./Obj2Element"

@defineElement({
  tagName: "zui-playground",
  html: htmlStr,
  css: cssStr,
  shadowDom: false,
})
export class Playground extends Zui(HTMLElement) {
  templateChild?: HTMLTemplateElement

  userFormSchema: ElementType[] = []
  tempsValues: any = {}

  @ref(".target")
  targetRef!: HTMLDivElement

  @ref(".controls")
  controlsRef!: HTMLDivElement

  getTemplateVariables(templateChild: HTMLTemplateElement): string[] {
    if (!templateChild) return []

    const htmlString = new XMLSerializer().serializeToString(
      templateChild.content,
    )

    const matches = htmlString.match(/\$[a-zA-Z_]\w*/g)

    return matches ? [...new Set(matches)] : []
  }

  replaceTemplateVariables(
    templateChild: HTMLTemplateElement,
    values: Record<string, string>,
  ): string {
    if (!templateChild) return ""

    const htmlString = new XMLSerializer().serializeToString(
      templateChild.content,
    )

    const replacedHtml = htmlString.replace(/\$[a-zA-Z_]\w*/g, (match) => {
      const key = match.substring(1)
      return values.hasOwnProperty(key) ? values[key] : match
    })

    return replacedHtml
  }

  constructor() {
    super()
    this.templateChild = this.children.namedItem("template")! as any
  }

  connected() {
    const tempVars = this.getTemplateVariables(this.templateChild!)

    for (const tempVar of tempVars) {
      const id = tempVar.substring(1)
      const parseObj = JSON.parse(
        this.children.namedItem(tempVar)?.getAttribute("data-meta") || "null",
      )

      this.userFormSchema.push({
        id,
        label: id,
        ...parseObj,
      })

      this.tempsValues[id] = parseObj?.value
    }

    this.updateTarget()

    this.userFormSchema.forEach((schema) => {
      const element = FormElementFactory.create(schema)

      switch (schema.type) {
        case "choose": {
          const select = element.querySelector<HTMLSelectElement>("select")!

          select.addEventListener("change", (e) => {
            const target = e.target as HTMLSelectElement
            this.tempsValues[schema.id!] = target.value
            this.updateTarget()
          })
          break
        }
        case "string": {
          const input = element.querySelector<HTMLInputElement>("input")!

          input.addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement
            this.tempsValues[schema.id!] = target.value
            this.updateTarget()
          })
          break
        }
        default: {
          break
        }
      }

      this.controlsRef.appendChild(element)
    })
  }

  updateTarget() {
    const finalHtml = this.replaceTemplateVariables(
      this.templateChild!,
      this.tempsValues,
    )

    this.targetRef.innerHTML = finalHtml
  }
}
