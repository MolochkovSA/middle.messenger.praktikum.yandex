import { Link } from '@/components'
import { Block } from '@/core'

import styles from './backLink.module.scss'

type BackLinkChildren = {
  Link: Link
}

export class BackLink extends Block<{}, {}, BackLinkChildren> {
  constructor() {
    super({
      children: {
        Link: new Link({
          to: '/chat',
          className: styles.link,
          label: '',
        }),
      },
    })
  }

  render(): string {
    return `{{{ Link }}}`
  }
}
