import { Block } from '@/core'
import { linkTemplate } from './link.tmpl'

type LinkProps = {
  to: string
  label: string | HTMLElement
  className?: string
}

export class Link extends Block {
  constructor({ to, label, className }: LinkProps) {
    super({
      props: {
        'data-page': to,
        className,
        label,
      },
    })
  }

  render(): string {
    return linkTemplate
  }
}
