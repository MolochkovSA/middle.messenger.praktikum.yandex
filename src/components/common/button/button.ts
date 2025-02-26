import { Block } from '@/core'

import { buttonTemplate } from './button.tmpl'

import styles from './button.module.scss'

type ButtonProps = {
  type: HTMLButtonElement['type']
  label: string | HTMLElement
  disabled?: boolean
  className?: string
  onClick?: (e: Event) => void
}

export class Button extends Block {
  constructor({ className, label, onClick, ...attrs }: ButtonProps) {
    super({
      tagName: 'button',
      className: `${styles.button} ${className ?? ''}`.trim(),
      props: {
        label,
      },
      attrs,
      events: {
        click: onClick,
      },
    })
  }

  render() {
    return buttonTemplate
  }
}
