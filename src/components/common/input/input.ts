import { Block } from '@/core'

import { inputTemplate } from './input.tmpl'

export type InputProps = {
  id: string
  type: HTMLInputElement['type']
  name: string
  placeholder: string
  value?: string
  disabled?: boolean
  className?: string
  onInput?: (e: Event) => void
  onChange?: (e: Event) => void
  onFocus?: (e: Event) => void
  onBlur?: (e: Event) => void
}

export class Input extends Block {
  constructor({ onInput, onChange, onBlur, onFocus, ...props }: InputProps) {
    super({
      props,
      events: {
        input: onInput,
        change: onChange,
        focus: onFocus,
        blur: onBlur,
      },
    })
  }

  render() {
    return inputTemplate
  }
}
