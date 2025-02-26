import { Block } from '@/core'
import { linkTemplate } from './link.tmpl'

import styles from './link.module.scss'

type LinkProps = {
  to: string
  label: string | HTMLElement
  className?: string
}

export class Link extends Block {
  constructor({ to, label, className }: LinkProps) {
    super({
      tagName: 'a',
      className: `${styles.link} ${className ?? ''}`.trim(),
      props: {
        label,
      },
      attrs: {
        href: '#',
        'data-page': to,
      },
    })
  }

  render(): string {
    return linkTemplate
  }
}
