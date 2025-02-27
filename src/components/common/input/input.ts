import { Block } from '@/core'

import { inputTemplate } from './input.tmpl'

export type InputName = 'first_name' | 'second_name' | 'login' | 'email' | 'password' | 'phone' | 'message'

export type InputProps = {
  id: string
  type: HTMLInputElement['type']
  name: InputName
  placeholder: string
  value?: string
  disabled?: boolean
  className?: string
}

export type InputEvents = {
  input?: (e: Event) => void
  change?: (e: Event) => void
  focus?: (e: Event) => void
  blur?: (e: Event) => void
}

export class Input extends Block<InputProps, InputEvents> {
  constructor({ input, change, focus, blur, ...props }: InputProps & InputEvents) {
    super({
      props,
      events: {
        input,
        change,
        focus,
        blur,
      },
    })
  }

  render() {
    return inputTemplate
  }
}
