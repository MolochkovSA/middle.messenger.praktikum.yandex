import { Block, Router } from '@/core'
import { RoutePath } from '@/config/routeConfig'

import styles from './link.module.scss'

type LinkProps = {
  to: `${RoutePath}` | '#'
  label: string | HTMLElement
  className?: string
}

type LinkEvents = {
  click: (e: Event) => void
}

export class Link extends Block<LinkProps, LinkEvents> {
  constructor({ to, label, className, click }: LinkProps & Partial<LinkEvents>) {
    super({
      props: {
        to,
        className,
        label,
      },
      events: {
        click:
          click ??
          ((e: Event) => {
            e.preventDefault()
            Router.navigate(this.getProps().to)
          }),
      },
    })
  }

  render(): string {
    return `
      <a href={{to}} class="${styles.link} {{className}}">
        {{{ label }}}
      </a>
    `
  }
}
