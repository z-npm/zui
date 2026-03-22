interface BaseElement {
  id?: string
  name?: string
  label?: string
  disabled?: boolean
  placeholder?: string
}

export interface StringType extends BaseElement {
  type: "string"
  value?: string
}

export interface NumberType extends BaseElement {
  type: "number"
  value?: number
  min?: number
  max?: number
}

export interface ChooseType extends Omit<BaseElement, "placeholder"> {
  type: "choose"
  value?: string | number
  options: {
    name: string
    value: string | number
  }[]
}

export interface BooleanType extends BaseElement {
  type: "boolean"
  value?: boolean
}

export type ElementType = StringType | NumberType | ChooseType | BooleanType

export type FormValueMap = Record<string, any>

export class FormElementFactory {
  public static create(config: ElementType): HTMLElement {
    const wrapper = document.createElement("div")
    wrapper.className = "form-group"

    if (config.label) {
      const label = document.createElement("label")
      label.textContent = config.label
      if (config.id) label.htmlFor = config.id
      wrapper.appendChild(label)
    }

    let input: HTMLInputElement | HTMLSelectElement

    switch (config.type) {
      case "string":
        input = this.createInput(config, "text")
        break
      case "number":
        input = this.createInput(config, "number")
        if (config.min !== undefined)
          (input as HTMLInputElement).min = String(config.min)
        if (config.max !== undefined)
          (input as HTMLInputElement).max = String(config.max)
        break
      case "boolean":
        input = this.createInput(config, "checkbox")
        if (config.value) (input as HTMLInputElement).checked = config.value
        break
      case "choose":
        input = this.createSelect(config)
        break
      default:
        throw new Error(`Unsupported element type: ${(config as any).type}`)
    }

    if (config.id) input.id = config.id
    if (config.name) input.name = config.name
    if (config.disabled) input.disabled = config.disabled

    if (config.type !== "boolean" && config.value !== undefined) {
      input.value = String(config.value)
    }

    wrapper.appendChild(input)
    return wrapper
  }

  private static createInput(
    config: BaseElement & { value?: any },
    inputType: string,
  ): HTMLInputElement {
    const input = document.createElement("input")
    input.type = inputType
    if (config.placeholder) input.placeholder = config.placeholder
    return input
  }

  private static createSelect(config: ChooseType): HTMLSelectElement {
    const select = document.createElement("select")
    config.options.forEach((opt) => {
      const option = document.createElement("option")
      option.value = String(opt.value)
      option.textContent = opt.name
      select.appendChild(option)
    })
    return select
  }
}
