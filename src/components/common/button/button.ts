import { Block } from '@/core'

import { buttonTemplate } from './button.tmpl'

type ButtonProps = {
  type: HTMLButtonElement['type']
  label: string | HTMLElement
  disabled?: boolean
  className?: string
  onClick?: (e: Event) => void
}

export class Button extends Block {
  constructor({ onClick, ...props }: ButtonProps) {
    super({
      props,
      events: {
        click: onClick,
      },
    })
  }

  render() {
    return buttonTemplate
  }

  logTest() {
    console.log('test')
  }
}
