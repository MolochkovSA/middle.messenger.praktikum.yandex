import { Block } from '@/core'

import styles from './link.module.scss'

type LinkProps = {
  to: string
  label: string | HTMLElement
  className?: string
}

export class Link extends Block {
  constructor({ to, label, className }: LinkProps) {
    super({
      props: {
        to,
        className,
        label,
      },
    })
  }

  render(): string {
    return `
      <a href="#" data-page="{{to}}" class="${styles.link} {{className}}">
        {{{ label }}}
      </a>
    `
  }
}
