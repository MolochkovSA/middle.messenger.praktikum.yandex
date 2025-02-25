import { Block } from '@/core'
import { Link as LinkTemplate } from './link.tmpl'

type LinkProps = {
  'data-page': string
  className?: string
}

export class LinkBlock extends Block {
  constructor(props: LinkProps) {
    super({ tagName: 'a', props })
  }

  render(): string {
    return LinkTemplate
  }
}
