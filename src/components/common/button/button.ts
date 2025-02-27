import { Block } from '@/core'

import { buttonTemplate } from './button.tmpl'

type ButtonProps = {
  type?: HTMLButtonElement['type']
  label: string | HTMLElement
  disabled?: boolean
  className?: string
}

type ButtonEvents = {
  click?: (e: Event) => void
}

export class Button extends Block<ButtonProps, ButtonEvents> {
  constructor({ click, type = 'button', ...props }: ButtonProps & ButtonEvents) {
    super({
      props: {
        ...props,
        type,
      },
      events: {
        click,
      },
    })
  }

  render() {
    return buttonTemplate
  }
}
