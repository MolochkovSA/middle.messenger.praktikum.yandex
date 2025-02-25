import { Block } from '@/core'

export type InputProps = {
  type: 'text' | 'password' | 'email' | 'number' | 'tel'
  name: string
  placeholder: string
  value: string
  disabled?: boolean
  className?: string
  onInput?: (e: Event) => void
  onChange?: (e: Event) => void
  onFocus?: (e: Event) => void
  onBlur?: (e: Event) => void
}

export class Input extends Block {
  constructor({ className, onInput, onChange, onBlur, onFocus, ...attrs }: InputProps) {
    super({
      tagName: 'input',
      className,
      attrs,
      events: {
        input: onInput,
        change: onChange,
        focus: onFocus,
        blur: onBlur,
      },
    })
  }
}
